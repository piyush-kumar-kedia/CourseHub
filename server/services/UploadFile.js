import fs from "fs";
import { getAccessToken } from "../modules/onedrive/onedrive.routes.js";
import axios from "axios";
import { FileModel } from "../modules/course/course.model.js";

async function GetFolderId(contributionId) {
    const access_token = await getAccessToken();
    // /me/drive/items/{parent-item-id}/children
    const parent_item_id = "014BDXJYPR2LB6XDZPOVFLXKHUJB3GCLD7";
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${parent_item_id}/children`;
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };

    try {
        const { data } = await axios.get(url, config);
        const foundFolder = data?.value?.find((folder) => folder.name === contributionId);
        if (foundFolder) return foundFolder?.id;
        return false;
    } catch (error) {
        return false;
    }
}

async function CreateFolder(contributionId) {
    const access_token = await getAccessToken();
    const parent_item_id = "014BDXJYPR2LB6XDZPOVFLXKHUJB3GCLD7";
    // /me/drive/items/{parent-item-id}/children
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${parent_item_id}/children`;
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };
    const _data = {
        name: contributionId,
        folder: {},
        "@microsoft.graph.conflictBehavior": "fail",
    };
    try {
        const { data } = await axios.post(url, _data, config);
        return data.id;
    } catch (error) {
        if (error.response.status === 409) {
            const folderId = await GetFolderId(contributionId);
            return folderId;
        } else {
            return false;
        }
    }
}

async function createUploadSession(folderId, fileName) {
    const access_token = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}:/${fileName}:/createUploadSession`;
    const config = {
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    };

    try {
        const { data } = await axios.post(url, {}, config);
        return data?.uploadUrl;
    } catch (error) {
        return false;
    }
}

async function UploadFile(contributionId, filePath, fileName) {
    const folderId = await CreateFolder(contributionId);
    if (!folderId) return false;
    const url = await createUploadSession(folderId, fileName);
    if (!url) {
        console.log("Error uploading!");
        return;
    }
    const file = fs.readFileSync(`${filePath}${fileName}`);
    const config = {
        headers: {
            "Content-Range": `bytes 0-${file.length - 1}/${file.length}`,
        },
    };
    try {
        const { data } = await axios.put(url, file, config);
        const fileData = new FileModel({
        fileId: data.id,
        type: data.file?.mimeType,
        size: data.size,
        name: fileName,
        downloadUrl: data["@content.downloadUrl"],
        webUrl: data.webUrl});
        await fileData.save();
        console.log("File saved");
        return fileData._id;
    } catch (error) {
        console.log(error);
        console.log("Error uploading!");
        return null;
    }
    
}

export default UploadFile;
