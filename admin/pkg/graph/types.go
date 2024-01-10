package graph

type DeviceCodeResponse struct {
	DeviceCode      string `json:"device_code"`
	UserCode        string `json:"user_code"`
	VerificationUri string `json:"verification_uri"`
	Message         string `json:"message"`
	ExpiresIn       int    `json:"expires_in"`
	Interval        int    `json:"interval"`
}

type AccessTokenResponse struct {
	TokenType    string `json:"token_type"`
	Scope        string `json:"scope"`
	AccessToken  string `json:"access_token"`
	IdToken      string `json:"id_token"`
	RefreshToken string `json:"refresh_token"`
}
type Folder struct {
	Name   string   `json:"name"`
	Id     string   `json:"id"`
	Folder isFolder `json:"folder"`
	WebUrl string   `json:"webUrl"`
}

type isFolder struct {
	ChildCount int
}

type DriveChildrenResponse struct {
	Value []Folder `json:"value"`
}
