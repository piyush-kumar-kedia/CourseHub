package rest

import (
	"coursehubadmin/config"
	"coursehubadmin/internal/rest/handlers"
	"coursehubadmin/internal/rest/utils"
	"coursehubadmin/pkg/coursehub"
	"errors"
	"io"
	"log"
	"text/template"

	"github.com/labstack/echo/v4"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

var t = &Template{
	templates: template.Must(template.ParseGlob("web/views/*.go.tmpl")),
}

func refreshTemplates() {
	log.Println("Refreshed templates")
	t = &Template{
		templates: template.Must(template.ParseGlob("web/views/*.go.tmpl")),
	}
}
func customHTTPErrorHandler(err error, c echo.Context) {
	// log.Println(err)
	c.Render(500, "error.go.tmpl", nil)
}

func HandleCreateMaps(a *config.App) error {
	id, name, err := utils.CreateMaps()
	if err != nil {
		return errors.New("could not load onedrive courses")
	}
	a.CourseCodeIdMap = id
	a.CourseCodeFullnameMap = name
	return nil
}

func StartApp(a *config.App) {
	e := echo.New()
	e.Renderer = t
	e.HTTPErrorHandler = customHTTPErrorHandler

	// Create maps
	err := HandleCreateMaps(a)
	if err != nil {
		log.Fatal(err)
	}

	handlers.InitHandlers(a)
	coursehub.InitCoursehub(a)

	if a.Environment != "production" {
		e.Use(func(next echo.HandlerFunc) echo.HandlerFunc {
			log.Println("Refreshing...")
			refreshTemplates()
			e.Renderer = t
			log.Println("Done")
			return next
		})
	}

	initRoutes(e)
	e.Logger.Fatal(e.Start(a.WebPort))
}
