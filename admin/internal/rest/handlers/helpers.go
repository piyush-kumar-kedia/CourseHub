package handlers

import (
	"coursehubadmin/pkg/coursehub"
	"strings"
)

func filterCourseByCode(contributions []coursehub.AllContributionResponse, code string) *[]coursehub.AllContributionResponse {
	var filtered []coursehub.AllContributionResponse
	for _, ele := range contributions {
		if strings.EqualFold(ele.CourseCode, code) {
			filtered = append(filtered, ele)
		}
	}

	return &filtered
}
func filterCourseById(contributions []coursehub.AllContributionResponse, c_id string) (*coursehub.AllContributionResponse, bool) {
	var filtered coursehub.AllContributionResponse
	found := false
	for _, ele := range contributions {
		if strings.EqualFold(ele.ContributionId, c_id) {
			filtered = ele
			found = true
			break
		}
	}

	return &filtered, found
}

func filterApprovedContributions(contributions []coursehub.AllContributionResponse) *[]coursehub.AllContributionResponse {
	var filtered []coursehub.AllContributionResponse
	for _, ele := range contributions {
		if !ele.Approved {
			filtered = append(filtered, ele)
		}
	}

	return &filtered
}
