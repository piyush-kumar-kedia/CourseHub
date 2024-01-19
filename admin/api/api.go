package api

// POST /upload request body
type POSTMoveFile struct {
	FileId              string `json:"fileId"`
	FileName            string `json:"fileName"`
	DestinationFolderId string `json:"destinationFolderId"`
}

// POST /folder request body
// eg: for /CE101 - Engineering Drawing/2022
// mind the slashes
//
//	body : {
//		code: "ce101",
//		year :"2022"
//	}
type POSTCreateFolder struct {
	Code string `json:"code"`
	Year string `json:"year"`
}

// POST /approve request body
type POSTMarkApproved struct {
	Id string `json:"id"`
}

type POSTCreateCourse struct {
	Code string `json:"code"`
	Name string `json:"name"`
}
