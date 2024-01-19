package handlers

import (
	"coursehubadmin/api"
	"coursehubadmin/config"
	"coursehubadmin/internal/rest/utils"
	"coursehubadmin/pkg/coursehub"
	"coursehubadmin/pkg/graph"
	"coursehubadmin/web"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
)

var app *config.App

func InitHandlers(a *config.App) {
	app = a
}

func GetAllContributions(c echo.Context) error {
	contributions, err := coursehub.GetAllCourseHubContributions()
	if err != nil {
		return err
	}
	code := c.QueryParam("code")
	accept := c.QueryParam("accept")

	if code != "" {
		contributions = filterCourseByCode(*contributions, code)
	}

	contributions = filterApprovedContributions(*contributions)
	templateData := &web.WebTemplateData{
		Data:      contributions,
		Status:    200,
		Message:   "All contributions",
		PageTitle: "Home - Admin",
	}

	if accept == "json" {
		return c.JSON(200, contributions)
	}

	return c.Render(200, "home.go.tmpl", templateData)
}

func GetContribution(c echo.Context) error {
	contributions, err := coursehub.GetAllCourseHubContributions()
	if err != nil {
		return err
	}
	c_id := c.Param("contribution_id")

	accept := c.QueryParam("accept")

	contribution, found := filterCourseById(*contributions, c_id)
	if !found {
		return c.Redirect(301, "/")
	}

	f, err := graph.VisitFolder(fmt.Sprintf("CourseHub Contributions/%s", c_id))
	if err != nil {
		return err
	}

	type File struct {
		Name   string
		WebUrl string
	}
	var files []File
	for _, ele := range *f {
		files = append(files, File{Name: ele.Name, WebUrl: ele.WebUrl})
	}

	d := make(map[string]any)
	d["Contribution"] = contribution
	d["Files"] = files

	templateData := &web.WebTemplateData{
		Data:      d,
		Status:    200,
		Message:   "Contribution",
		PageTitle: "Home - Admin",
	}

	if accept == "json" {
		return c.JSON(200, contribution)
	}

	return c.Render(200, "contribution.go.tmpl", templateData)
}

func UploadPage(c echo.Context) error {
	contributions, err := coursehub.GetAllCourseHubContributions()
	if err != nil {
		return err
	}
	c_id := c.Param("contribution_id")

	accept := c.QueryParam("accept")

	contribution, found := filterCourseById(*contributions, c_id)
	if !found {
		return c.Redirect(301, "/")
	}
	namecode, err := coursehub.GetFullCourseName(contribution.CourseCode)
	if err != nil {
		if err.Error() == "not found" {
			d := make(map[string]string)
			d["code"] = contribution.CourseCode

			templateData := &web.WebTemplateData{
				Status:    404,
				Message:   "Course not found",
				PageTitle: "Create Course",
				Data:      d,
			}
			return c.Render(404, "create-course.go.tmpl", templateData)
		}
		log.Println("")
		return err
	}

	f, err := graph.VisitFolder(fmt.Sprintf("CourseHub Contributions/%s", c_id))
	if err != nil {
		return err
	}
	years, err := graph.VisitFolder(fmt.Sprintf("CourseHub/%s - %s", contribution.CourseCode, *namecode))
	if err != nil {
		return err
	}

	subFolders := make(map[string][]graph.Folder)
	// {2019: [Folder, Folder], 2020: [Folder, Folder]}
	subSubFolders := make(map[string]map[string][]graph.Folder)
	// {2019:{Slides : [Folder, Folder]}}

	for _, ele := range *years {
		sf, err := graph.VisitFolder(fmt.Sprintf("CourseHub/%s - %s/%s", contribution.CourseCode, *namecode, ele.Name))
		if err != nil {
			return err
		}
		subFolders[ele.Name] = *sf
		subSubFolders[ele.Name] = make(map[string][]graph.Folder)
		for _, e := range *sf {

			ssf, err := graph.VisitFolder(fmt.Sprintf("CourseHub/%s - %s/%s/%s", contribution.CourseCode, *namecode, ele.Name, e.Name))
			if err != nil {
				return err
			}

			foldersPresent := false

			for _, ssf_files := range *ssf {
				if ssf_files.Folder.ChildCount > 0 {
					foldersPresent = true
					break
				}
			}

			if foldersPresent {
				subSubFolders[ele.Name][e.Name] = *ssf
			}

		}
	}
	type AllowedFolder struct {
		Name   string
		Id     string
		WebUrl string
		Path   string
	}

	var folders []AllowedFolder
	for year, ele := range subSubFolders {
		for subfolder, ele2 := range ele {
			for _, folder := range ele2 {
				f := AllowedFolder{
					Name:   folder.Name,
					Id:     folder.Id,
					WebUrl: folder.WebUrl,
					Path:   fmt.Sprintf("%s-%s", year, subfolder),
				}
				folders = append(folders, f)
			}
		}
	}
	for year, val := range subFolders {
		for _, ele := range val {
			_, found := subSubFolders[year][ele.Name]
			if !found {
				f := AllowedFolder{
					Name:   ele.Name,
					Id:     ele.Id,
					WebUrl: ele.WebUrl,
					Path:   year,
				}
				folders = append(folders, f)
			}
		}
	}

	type File struct {
		Name   string
		WebUrl string
		Id     string
	}

	var files []File
	for _, ele := range *f {
		files = append(files, File{Name: ele.Name, WebUrl: ele.WebUrl, Id: ele.Id})
	}

	d := make(map[string]any)
	d["Contribution"] = contribution
	d["Files"] = files
	// d["Years"] = *years
	// d["Subfolders"] = subFolders
	// d["Subsubfolders"] = subSubFolders
	d["AllowedFolders"] = folders

	templateData := &web.WebTemplateData{
		Data:      d,
		Status:    200,
		Message:   "Upload Contribution",
		PageTitle: "Upload - Admin",
	}

	if accept == "json" {
		return c.JSON(200, templateData)
	}
	return c.Render(200, "upload.go.tmpl", templateData)
}

func MoveFile(c echo.Context) error {
	var body api.POSTMoveFile
	err := c.Bind(&body)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	log.Println(body)
	err = graph.MoveFile(body.FileId, body.FileName, body.DestinationFolderId)

	if err != nil {
		log.Println(err)
		return c.String(http.StatusInternalServerError, "failed to upload")
	}
	return c.String(http.StatusOK, "test")
}

func CreateNewFolder(c echo.Context) error {
	var body api.POSTCreateFolder
	err := c.Bind(&body)
	if err != nil {
		return err
	}

	fullName, ok := app.CourseCodeFullnameMap[strings.ToLower(strings.TrimSpace(body.Code))]
	if !ok {
		return c.String(400, "bad code provided")
	}

	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s/%s", fullName, body.Year))
	if err != nil {
		return c.String(500, "could not create folders")
	}
	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s/%s/Slides", fullName, body.Year))
	if err != nil {
		return c.String(500, "could not create folders")
	}
	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s/%s/Notes", fullName, body.Year))
	if err != nil {
		return c.String(500, "could not create folders")
	}
	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s/%s/Tutorials", fullName, body.Year))
	if err != nil {
		return c.String(500, "could not create folders")
	}
	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s/%s/Exams", fullName, body.Year))
	if err != nil {
		return c.String(500, "could not create folders")
	}
	return c.String(201, "folders created")

}

func MarkApproved(c echo.Context) error {
	var body api.POSTMarkApproved
	err := c.Bind(&body)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	log.Println(body.Id)
	err = coursehub.MarkContributionAsApproved(body.Id)
	if err != nil {
		return c.String(http.StatusBadRequest, err.Error())
	}
	return c.String(200, "approved")
}

func CreateCourse(c echo.Context) error {
	var body api.POSTCreateCourse
	err := c.Bind(&body)
	if err != nil {
		return c.String(http.StatusBadRequest, "bad request")
	}
	// create folder in onedrive
	course := fmt.Sprintf("%s - %s", strings.TrimSpace(body.Code), strings.TrimSpace(body.Name))
	log.Println(course)
	err = graph.CreateFolder(fmt.Sprintf("CourseHub/%s", course))
	if err != nil {
		return c.String(400, "could not create course")
	}
	// update search results
	err = coursehub.CreateNewSearchResult(strings.TrimSpace(body.Code), strings.TrimSpace(body.Name))
	if err != nil {
		return c.String(400, "could not create course")
	}
	// refresh maps
	id, name, err := utils.CreateMaps()
	if err != nil {
		return errors.New("could not load onedrive courses")
	}
	app.CourseCodeIdMap = id
	app.CourseCodeFullnameMap = name

	return c.String(200, "Created!")
}
