package rest

import (
	"coursehubadmin/internal/rest/handlers"

	"github.com/labstack/echo/v4"
)

func initRoutes(e *echo.Echo) {
	e.GET("/", handlers.GetAllContributions)
	e.GET("/upload/:contribution_id", handlers.UploadPage)
	e.GET("/:contribution_id", handlers.GetContribution)
	e.POST("/upload", handlers.MoveFile)
	e.POST("/folder", handlers.CreateNewFolder)
	e.POST("/approve", handlers.MarkApproved)
	e.POST("/course", handlers.CreateCourse)
}
