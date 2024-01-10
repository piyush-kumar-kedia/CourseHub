package graph

import (
	"bytes"
	"coursehubadmin/config"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"os"
)

var tentant string
var scopes string
var clientId string

func InitGraph(a *config.App) {
	tentant = a.GraphTenant
	scopes = a.GraphScopes
	clientId = a.GraphClientId
}

func FetchDeviceToken() {
	authUrl := fmt.Sprintf("https://login.microsoftonline.com/%s/oauth2/v2.0/devicecode", tentant)

	body := url.Values{
		"tenant":    {tentant},
		"client_id": {clientId},
		"scope":     {scopes},
	}

	resp, err := http.PostForm(authUrl, body)
	if err != nil {
		log.Fatal(err)
	}

	defer resp.Body.Close()
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}

	res := &DeviceCodeResponse{}
	err = json.Unmarshal(responseBody, &res)
	if err != nil {
		log.Fatal(err)
	}

	err = writeToFile("devicecode.txt", res.DeviceCode)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("verificationuri.txt", res.VerificationUri)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("usercode.txt", res.UserCode)
	if err != nil {
		log.Fatal(err)
	}
}

func FetchAccessToken() {
	deviceCode, err := os.ReadFile("devicecode.txt")
	if err != nil {
		log.Fatal(err)
	}
	accessTokenUrl := fmt.Sprintf("https://login.microsoftonline.com/%s/oauth2/v2.0/token", tentant)
	formBody := url.Values{
		"tenant":      {tentant},
		"grant_type":  {"urn:ietf:params:oauth:grant-type:device_code"},
		"client_id":   {clientId},
		"device_code": {string(deviceCode)},
	}
	resp, err := http.PostForm(accessTokenUrl, formBody)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	res := &AccessTokenResponse{}
	err = json.Unmarshal(responseBody, &res)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("accesstoken.txt", res.AccessToken)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("refreshtoken.txt", res.RefreshToken)
	if err != nil {
		log.Fatal(err)
	}
}

func refreshAccessToken() {
	refresh, err := os.ReadFile("refreshtoken.txt")
	if err != nil {
		log.Fatal(err)
	}
	accessTokenUrl := fmt.Sprintf("https://login.microsoftonline.com/%s/oauth2/v2.0/token", tentant)
	formBody := url.Values{
		"tenant":        {tentant},
		"grant_type":    {"refresh_token"},
		"client_id":     {clientId},
		"refresh_token": {string(refresh)},
	}
	resp, err := http.PostForm(accessTokenUrl, formBody)
	if err != nil {
		log.Fatal(err)
	}
	defer resp.Body.Close()
	responseBody, err := io.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	res := &AccessTokenResponse{}
	err = json.Unmarshal(responseBody, &res)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("accesstoken.txt", res.AccessToken)
	if err != nil {
		log.Fatal(err)
	}
	err = writeToFile("refreshtoken.txt", res.RefreshToken)
	if err != nil {
		log.Fatal(err)
	}
}

func writeToFile(path string, data string) error {
	err := os.Remove(path)
	if err != nil && !errors.Is(err, os.ErrNotExist) {
		return err
	}
	err = os.WriteFile(path, []byte(data), 0777)
	return err
}

func GetAccessToken() string {
	refreshAccessToken()
	content, err := os.ReadFile("accesstoken.txt")
	if err != nil {
		log.Fatal(err)
	}
	return string(content)
}

// Visit a OneDrive Folder. Takes in path relative to root folder (witout leading and trailing slashes).
func VisitFolder(path string) (*[]Folder, error) {
	driveRoot := fmt.Sprintf("https://graph.microsoft.com/v1.0/me/drive/root:/%s:/children", path)
	client := &http.Client{}
	req, err := http.NewRequest("GET", driveRoot, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", GetAccessToken()))
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	content, err := io.ReadAll(resp.Body)

	if err != nil {
		return nil, err
	}
	res := &DriveChildrenResponse{}

	err = json.Unmarshal(content, &res)
	if err != nil {
		return nil, err
	}

	return &res.Value, nil
}

// Moves a file to destination folder.
func MoveFile(fileId string, fileName string, destinationFolderId string) error {
	moveUrl := fmt.Sprintf("https://graph.microsoft.com/v1.0/me/drive/items/%s", fileId)
	client := &http.Client{}
	body := fmt.Sprintf(`{
		"parentReference": {
			"id": "%s"
		},
		"name": "%s"
	}`, destinationFolderId, fileName)
	b := bytes.NewReader([]byte(body))
	req, err := http.NewRequest("PATCH", moveUrl, b)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", GetAccessToken()))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode != 200 {
		return errors.New("failed to upload file")
	}
	return nil
}

// Creates a new folder. Provide path (without leading and trailing slashes) relative to root folder.
// Last item in the path is the new folder.
func CreateFolder(path string) error {
	// api not in docs
	// refer
	//https://stackoverflow.com/questions/66631136/creating-nested-folder-in-sharepoint-with-graph-api-fails
	createUrl := fmt.Sprintf("https://graph.microsoft.com/v1.0/me/drive/root:/%s", path)
	log.Println(createUrl)
	client := &http.Client{}
	body := `{
		"folder": {},
    "@microsoft.graph.conflictBehavior": "fail"
	}`
	b := bytes.NewReader([]byte(body))
	req, err := http.NewRequest("PATCH", createUrl, b)
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", GetAccessToken()))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	if resp.StatusCode != 201 {
		return errors.New("could not create folder")
	}

	return nil
}
