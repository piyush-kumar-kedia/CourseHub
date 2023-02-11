# CourseHub API

### Documentation

---

Frontend specific endpoints.

## 1. Authentication and Authorization

---

> **`OAuth2 Consent screen`(Web)**

| GET | /api/auth/login |
| --- | --- |

Redirects to Microsoft login page.

After successful redirect, the browser recieves a cookie with access_token and needs to be sent with every protected request for authorization.

---

For mobile, follow the usual OAuth2 process till you recieve “code” after redirect. Send the code to the api to generate access_token. (**Use the same graph api client credentials and your app’s redirect uri.)

> `**Get access token` (Mobile)**

Requires “**code**” obtained from MicrosoftGraph redirect uri’s **query params**.

---

| POST | /api/auth/mobile |
| --- | --- |
| Body | code |

Request body

```json
{
	"code":"0.ASoAjacKheGUxkuc84wRtTBwHKxkyMbtzOZLhlfKFRcOe1EqAAA.AgABAAIAAAD--DLA3VO7QrddgJg7WevrAgDs_wUA9P_zVHzsec_TenG5bEgvI7KnBAJu61yU0b9syBwQ0LzXBMvXvseTIk3qNobFKym9nhCOXWhGMm2RkI4TVwIsBMnn4MDTgC-ymAY4FnUYKVyS9a5kZIPmL6iV40FqdRNMHkeHb5wcMM3SlvF8TKxagfBw_dhi1xAx7TOaAd0aNgBbE6RHS08qCrfxd_Gkeot5QWDJ-zM0ho1fSfE_vlXUxuV9tJquJh3-akB7Oah9T4DqF5aNLc6Z2PLmmjgknSgR-y9AEGxVguI_E-mns8TbDpgNNSYNpojxZCJP613r582pVUh9gXAayvqtUr_S571zUKbpTgjOpy1gjTAidsg_SShEPpPSJFh58HERZ6HN0NUPpf-97L2boTaUiMN1O7sJEL2UM8bSyn6WB8nDJvMRgHtGq4LmRknNCyZnwngykEbZ-a-3vTwN-PAgVIKqd0OsG75ArxUpzOCdQq-m2sgJtZO7dihEDx3AGPFN4WkXmV-JMQCqbXeY59FDe9wCsmf9ID4GP3aMwooo9uUo6NqE8EfeEpZ5pGAzhkIc6zEYBDypQ4aQE-hPaWLmuEFps0ad-YbRHW-W4OB2Bd-wzrLpqyuigc_IquHXQBfRZYhTSp270fUPJ8z_5sa6axn4LoL5SqzNsJrtVWtZIbWMRRh-JzGz0D4Rn6w3wZKNY2m0-Asrj9W7hZM-m5EP"
}
```

Response

```json
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjNiZmZlM2E1ZTU5ZmQyMTI5ZmExZDg5IiwiaWF0IjoxNjc0OTk4Mzg3LCJleHAiOjE2NzUwMDE5ODd9.WZdXdeI9j2F9LYMTJZjpm-hlnMILheRG0gTQo63wmlk"
}
```

---

**For protected routes, add the Authorization `header` to your request (Mobile). (**For web simply send the cookie with every request)**

```json
"Authorization": Token <access_token-here>
```

In case of invalid or expired access_token, api responds with **status code `403`**.

Common error responses

```json
//When you provide no or invalid format of access_token
//STATUS CODE 403
{
	"error": true,
	"message": "Invalid token"
}
```

```json
//When you provide exipred access_token
//STATUS CODE 403
{
	"error": true,
	"message": "Not Authenticated"
}
```

---

## 2. User

User info endpoints

> `**Get Current User` `*PROTECTED*`**

Sends back user info with user favourite files.

| GET | /api/user/ |
| --- | --- |

Sample Response

```json
{
"_id": "63bffe3a5e59fd2129fa1d99",
"name": "NAME HERE",
"email": "user@iitg.ac.in",
"rollNumber": 2101010101,
"semester": 2,
"degree": "BTECH",
"courses": [
	{
	"code": "CH211",
	"name": "Industrial Chemistry"
	},
	{
	"code": "CH222",
	"name": "Applied Organic Chemistry"
	},
	{
	"code": "CH223",
	"name": "Chemical Technology Lab - I (Organic)"
	},
	{
	"code": "CH224",
	"name": "Group Theory"
	},
	{
	"code": "CH233",
	"name": "Spectroscopic Techniques in Chemistry"
	},
	{
	"code": "HS138",
	"name": "Psychology of Well Being"
	}
],
"department": "Chemical Science and Technology",
	"favourites": [
	{
	"name": "02_Tutorial 5_Monday_AL1_Lab group 8.docx",
	"id": "01OXYV3754ESP2EMFC6VB2E6QI6BKEJSFH",
	"path": "CE101/2020/Tutorials/",
	"code": "CE101",
	"_id": "63c033fd5e59fd2129fa1dd5"
	},
	{
	"name": "01 Lettering and dimensioning.pdf",
	"id": "01OXYV37ZE4E7SGVKYURDJAMAYI2S25OBN",
	"path": "CE101 - Engineering Design/2020/Slides/",
	"code": "ce101",
	"_id": "63d6334968f2188184c67f96"
	},
	{
	"name": "03. Conics_read only.pptx",
	"id": "01OXYV375D5N4V2GYNNNF3UTTAVE6LGFRL",
	"path": "CE101 - Engineering Design/2020/Slides/",
	"code": "ce101",
	"_id": "63d6334a68f2188184c67f9e"
	}
],
"__v": 5
}
```

---

> **`Add New Favourite` *`PROTECTED`***

//to update

| POST | /api/user/favourite |
| --- | --- |
| Body | id, name, path, code |

Request body

```json
{
	"name":"02_Tutorial 5_Monday_AL1_Lab group 8.docx",
	"id": "01OXYV3754ESP2EMFC6VB2E6QI6BKEJSFH",
	"path":"CE101/2020/Tutorials/",
	"code":"CE101"
}
```

> **`Remove Favourite` *`PROTECTED`***

| DELETE | /api/user/favourite/[[_id]] |
| --- | --- |
| Params | _id |

## 3. Courses

> `**Get Course**`

| GET | /api/course/[[code]] |
| --- | --- |
| Params | code |

Found Response

```json
{
"found": true,
"_id": "63d3d63f91917a6338d8084a",
"name": "mathematics i",
"code": "ma101",
"children": [
	{
		"_id": "63d3d63c91917a6338d80721",
		"course": "ma101",
		"id": "01OXYV376WOSI32K2D5NDKZFSROR47XVP5",
		"name": "2020",
		"childType": "Folder",
		"path": "MA101 - Mathematics I/",
		"children": [
			{
				"_id": "63d3d63c91917a6338d8071f",
				"course": "ma101",
				"id": "01OXYV377MHVTULFUZ55EJYRNAN3WDQTNX",
				"name": "Exams",
				"childType": "File",
				"path": "MA101 - Mathematics I/2020/",
				"children": [
					{
					"_id": "63d3d63c91917a6338d8070f",
					"course": "ma101 - mathematics i",
					"name": "quiz1.pdf",
					"id": "01OXYV376IFANVOL2BHREL2IOYX7HO5H5L",
					"size": "0.047438999999999995",
					"thumbnail": "https://ik.imagekit.io/c7u7l7qa8/01OXYV376IFANVOL2BHREL2IOYX7HO5H5L_URj8DkbXdI.jpg"
					},
					{
					"_id": "63d3d63c91917a6338d80705",
					"course": "ma101 - mathematics i",
					"name": "Quiz-2-MA101.pdf",
					"id": "01OXYV376JGMFXNVRJAFCK62GRYCOH47AU",
					"size": "0.18520799999999998",
					"thumbnail": "https://ik.imagekit.io/c7u7l7qa8/01OXYV376JGMFXNVRJAFCK62GRYCOH47AU_iZ7NQYTfm_.jpg"
					},
					{
					"_id": "63d3d63c91917a6338d80715",
					"course": "ma101 - mathematics i",
					"name": "Quiz-III_Solution.pdf",
					"id": "01OXYV37Y4PNKNFPGT6REKF3X2CCBNEBF5",
					"size": "0.17294199999999998",
					"thumbnail": "https://ik.imagekit.io/c7u7l7qa8/01OXYV37Y4PNKNFPGT6REKF3X2CCBNEBF5_9kQQyBmzBH.jpg"
					},
					{
					"_id": "63d3d63c91917a6338d806ff",
					"course": "ma101 - mathematics i",
					"name": "Quiz-IV MA101 2020.pdf",
					"id": "01OXYV376QLW2GQVRPDVDLZXAXKVRN2P36",
					"size": "0.119099",
					"thumbnail": "https://ik.imagekit.io/c7u7l7qa8/01OXYV376QLW2GQVRPDVDLZXAXKVRN2P36_pUmUgIh9nP.jpg"
					}
			]
		}
	]
}
],
"books": []
}
```

Not found response

```json
{
	"found": false
}
```

## 4. Files

> `**Get Download link` *`PROTECTED`***

| GET | /api/file/download/[[Onedrive-File-ID]] |
| --- | --- |
| Params | OneDrive file Id  and NOT _id (Eg. "id": "01OXYV376IFANVOL2BHREL2IOYX7HO5H5L") |

Response

```json
//response
{
	"url":"download-link-here"
}
```

> `**Get Preview link` *`PROTECTED`***

| GET | /api/file/preview/[[File-ID]] |
| --- | --- |
| Params | file Id |

Response

```json
//response
{
	"url":"preview-link-here"
}
```

//routes not added yet

## 5. Miscellaneous Data

> **`Exam Dates` *`PROTECTED`***

| GET | /api/exam/[[semester]] |
| --- | --- |
| Params | semester (1,2,3,4,5,6,7,8) |

Response

```json
//response
{
	"download_link":"download-link-here"
}
```

> `**Contribution List` *`PROTECTED`***

| GET | /api/contributions |
| --- | --- |

Response

```json
//response
{
	"download_link":"download-link-here"
}
```
