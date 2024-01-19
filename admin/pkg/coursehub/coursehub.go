package coursehub

import (
	"bytes"
	"coursehubadmin/config"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
)

var coursehubApiRoot = "https://www.coursehubiitg.in/api"
var app *config.App

func InitCoursehub(a *config.App) {
	app = a
}

type AllContributionResponse struct {
	Id             string `json:"_id"`
	FileName       []string
	Approved       bool
	ContributionId string
	IsAnonymous    bool
	CourseCode     string
	Description    string
	Folder         string
	UploadedBy     string
	Year           string
}

func GetAllCourseHubContributions() (*[]AllContributionResponse, error) {
	c_url := fmt.Sprintf(coursehubApiRoot + "/contribution/all")
	client := &http.Client{}
	req, err := http.NewRequest("GET", c_url, nil)
	if err != nil {
		return nil, err
	}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	content, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	res := &[]AllContributionResponse{}
	err = json.Unmarshal(content, &res)
	if err != nil {
		return nil, err
	}

	return res, nil
}

type NameCode struct {
	Code        string
	Name        string
	IsAvailable bool
}

type FullCourseNameResponse struct {
	Results []NameCode
}

func GetFullCourseName(code string) (*string, error) {
	// c_url := fmt.Sprintf(coursehubApiRoot + "/search")
	// client := &http.Client{}

	// body := fmt.Sprintf(`{
	// 	"words":["%s"]
	// }`, code)

	// b := bytes.NewReader([]byte(body))
	// req, err := http.NewRequest("POST", c_url, b)
	// req.Header.Set("Content-Type", "application/json")
	// if err != nil {
	// 	return nil, err
	// }
	// resp, err := client.Do(req)
	// if err != nil {
	// 	return nil, err
	// }
	// content, err := io.ReadAll(resp.Body)
	// if err != nil {
	// 	return nil, err
	// }
	// res := &FullCourseNameResponse{}

	// err = json.Unmarshal(content, &res)
	// if err != nil {
	// 	return nil, err
	// }
	// log.Println(res)
	// if len(res.Results) == 0 {
	// 	return nil, errors.New("not found")
	// }

	// return &res.Results[0].Name, nil
	name, ok := app.CourseCodeFullnameMap[strings.ToLower(code)]
	if !ok {
		return nil, errors.New("not found")
	}
	courseName := strings.TrimSpace(strings.Split(name, "-")[1])
	return &courseName, nil
}

func MarkContributionAsApproved(id string) error {
	c_url := coursehubApiRoot + "/admin/contribution/markapproved"
	client := &http.Client{}
	body := fmt.Sprintf(`{
		"id":"%s"
	}`, id)
	b := bytes.NewReader([]byte(body))
	req, err := http.NewRequest("POST", c_url, b)
	req.Header.Set("Authorization", app.CourseHubApiAccessToken)
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	log.Println(resp)
	if resp.StatusCode != 200 {
		return errors.New("could not approve contribution")
	}
	return nil
}

func CreateNewSearchResult(code string, name string) error {
	c_url := coursehubApiRoot + "/search/feed"
	client := &http.Client{}
	body := fmt.Sprintf(`{
		"code":"%s",
		"name":"%s"
	}`, code, name)
	b := bytes.NewReader([]byte(body))
	req, err := http.NewRequest("POST", c_url, b)
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	resp.Body.Close()
	return nil
}
