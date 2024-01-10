package main

import (
	"coursehubadmin/config"
	"coursehubadmin/internal/rest"
	"coursehubadmin/pkg/graph"
)

func main() {
	app := config.InitApp()
	graph.InitGraph(app)

	// s, err := graph.VisitFolder("CourseHub/MA101 - Mathematics I/2020")
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// for _, ele := range *s {
	// 	log.Println(ele)
	// }

	rest.StartApp(app)
}
