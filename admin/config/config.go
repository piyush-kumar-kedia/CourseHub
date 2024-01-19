package config

type App struct {
	WebPort                 string
	GraphTenant             string
	GraphScopes             string
	GraphClientId           string
	CourseCodeIdMap         map[string]string
	CourseCodeFullnameMap   map[string]string
	Environment             string
	CourseHubApiAccessToken string
}

func InitApp() *App {
	return &App{
		WebPort:                 ":8080",
		GraphTenant:             "850aa78d-94e1-4bc6-9cf3-8c11b530701c",
		GraphScopes:             "user.read offline_access files.readwrite",
		GraphClientId:           "1ca4710e-1fe9-460c-b619-9e62e6a94110",
		Environment:             "development",
		CourseHubApiAccessToken: "Bearer admin-coursehub-cc23-golang",
	}
}
