package utils

import (
	"coursehubadmin/pkg/graph"
	"strings"
)

func CreateMaps() (map[string]string, map[string]string, error) {
	f, err := graph.VisitFolder("CourseHub")
	if err != nil {
		return nil, nil, err
	}
	codeId := make(map[string]string)
	codeFullname := make(map[string]string)
	for _, e := range *f {
		codeId[strings.ToLower(strings.TrimSpace(strings.Split(e.Name, "-")[0]))] = e.Id
	}
	for _, e := range *f {
		codeFullname[strings.ToLower(strings.TrimSpace(strings.Split(e.Name, "-")[0]))] = e.Name
	}
	return codeId, codeFullname, nil
}
