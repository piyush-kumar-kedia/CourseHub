import express from "express";
import axios from "axios";
import qs from "querystring";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js";
import settings from "../../config/onedrive.js";
import fs from "fs";

import CourseModel, {
	FolderModel,
	FileModel,
} from "../../models/course.model.js";

const router = express.Router();

const drive_id =
	"b!pxmuhRkkIESn1NJOh3iVay2m314xO8NGtXVieZjVnTQBFLWQU0FfSqSeomGkWOvO";
const coursehub_id = "01OXYV37Y64PLOWXJRRBGKGSMVOFLO3OPZ";

router.get(
	"/generatedevicecode",
	catchAsync(async (req, res) => {
		var data = qs.stringify({
			tenant: settings.tenantId,
			client_id: settings.clientId,
			scope: "user.read offline_access files.readwrite",
		});

		var config = {
			method: "post",
			url: `https://login.microsoftonline.com/${settings.authTenant}/oauth2/v2.0/devicecode`,
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			data: data,
		};
		const response = await axios.post(config.url, config.data, {
			headers: config.headers,
		});

		if (!response.data) throw new AppError(500, "Something went wrong");

		console.log(response.data.user_code);

		fs.writeFileSync(
			"./onedrive-device-code.token",
			response.data.device_code,
			"utf-8"
		);
		fs.unlinkSync("./onedrive-access-token.token");
		fs.unlinkSync("./onedrive-refresh-token.token");

		res.redirect(`https://microsoft.com/devicelogin`);

		res.status(200).json({
			status: "success",
			data: {
				message: response.data,
			},
		});
	})
);

router.get(
	"/getaccesscode",
	catchAsync(async (req, res) => {
		var token = await getAccessToken();
		res.status(200).json({
			status: "success",
			data: {
				access_token: token,
			},
		});
	})
);

router.get(
	"/getfiles",
	catchAsync(async (req, res) => {
		var data = await visitAllFiles();
		res.status(200).json(data);
	})
);

async function visitAllFiles() {
	var access_token = await getAccessToken();
	var headers = {
		Authorization: `Bearer ${access_token}`,
		Host: "graph.microsoft.com",
	};
	var url = `https://graph.microsoft.com/v1.0/me/drive/items/${coursehub_id}/children`;
	var data = await getRequest(url, headers);
	var children = data.value;
	const folders = children.map(async (child, idx) => {
		const folder_data = await visitFolder(child);
		return folder_data;
	});
	const resolved_folders = await Promise.all(folders);
	resolved_folders.map(async (folder) => {
		await CourseModel.create({
			name: folder.name,
			code: folder.name,
			children: folder.children,
		});
	});
	return "ok";
}

async function visitFolder(folder) {
	var access_token = await getAccessToken();
	var headers = {
		Authorization: `Bearer ${access_token}`,
		Host: "graph.microsoft.com",
	};
	var url = `https://graph.microsoft.com/v1.0/me/drive/items/${folder.id}/children`;
	var data = await getRequest(url, headers);
	var children = data.value;
	var childType = "File";

	const folders = children.map(async function (child) {
		if (child.folder) {
			childType = "Folder";
			let data = await visitFolder(child);
			return data;
		} else {
			let data = await visitFile(child);
			return data;
		}
	});

	let res = await Promise.all(folders);
	//make mongoose folder
	const NewFolder = await FolderModel.create({
		name: folder.name,
		childType: childType,
		children: res,
	});
	return NewFolder;
}

async function visitFile(file) {
	//var previewUrl = await getFilePreviewLink(file.id);

	var file_urls = {
		//previewUrl: previewUrl,
		downloadUrl: file["@microsoft.graph.downloadUrl"],
		webUrl: file.webUrl,
	};

	//make mongoose file
	const NewFile = await FileModel.create({
		name: file.name,
		id: file.id,
		webUrl: file.webUrl,
		downloadUrl: file["@microsoft.graph.downloadUrl"],
	});
	return NewFile._id;
}

async function getFilePreviewLink(file_id) {
	var access_token = await getAccessToken();
	var headers = {
		Authorization: `Bearer ${access_token}`,
		Host: "graph.microsoft.com",
		"Content-Type": "application/json",
	};
	var params = {
		viewer: "onedrive",
		allowEdit: true,
	};
	var url = `https://graph.microsoft.com/v1.0/me/drive/items/${file_id}/preview`;
	var data = await postRequest(url, headers, params);
	return data.getUrl;
}

async function getAccessToken() {
	var data;
	if (fs.existsSync("./onedrive-refresh-token.token")) {
		data = await refreshAccessToken();
	} else {
		data = await generateAccessToken();
	}
	//console.log(data);
	return data.access_token;
}

async function refreshAccessToken() {
	var data = qs.stringify({
		tenant: settings.tenantId,
		client_id: settings.clientId,
		refresh_token: `${fs.readFileSync(
			"./onedrive-refresh-token.token",
			"utf-8"
		)}`,
		grant_type: "refresh_token",
	});

	var config = {
		method: "post",
		url: `https://login.microsoftonline.com/${settings.authTenant}/oauth2/v2.0/token`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			Host: "login.microsoftonline.com",
		},
		data: data,
	};
	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");

	fs.writeFileSync(
		"./onedrive-access-token.token",
		response.data.access_token,
		"utf-8"
	);
	fs.writeFileSync(
		"./onedrive-refresh-token.token",
		response.data.refresh_token,
		"utf-8"
	);

	return response.data;
}

async function generateAccessToken() {
	var data = qs.stringify({
		tenant: settings.tenantId,
		client_id: settings.clientId,
		device_code: `${fs.readFileSync(
			"./onedrive-device-code.token",
			"utf-8"
		)}`,
		grant_type: "urn:ietf:params:oauth:grant-type:device_code",
	});

	var config = {
		method: "post",
		url: `https://login.microsoftonline.com/${settings.authTenant}/oauth2/v2.0/token`,
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: data,
	};
	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");
	//console.log(response.data);

	fs.writeFileSync(
		"./onedrive-access-token.token",
		response.data.access_token,
		"utf-8"
	);
	fs.writeFileSync(
		"./onedrive-refresh-token.token",
		response.data.refresh_token,
		"utf-8"
	);

	return response.data;
}

async function getRequest(url, headers) {
	//var data = qs.stringify(params);
	var config = {
		method: "get",
		url: url,
		headers: headers,
	};

	const response = await axios.get(config.url, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");

	return response.data;
}

async function postRequest(url, headers, params) {
	var data = qs.stringify(params);
	var config = {
		method: "post",
		url: url,
		headers: headers,
		data: data,
	};

	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");

	return response.data;
}

export default router;
