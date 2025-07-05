import fs from "fs";
import { getAccessToken } from "../modules/onedrive/onedrive.routes.js";
import axios from "axios";
import { FileModel } from "../modules/course/course.model.js";
import Contribution from "../modules/contribution/contribution.model.js";
import { type } from "os";

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
        return { url: data?.uploadUrl, access_token };
    } catch (error) {
        return false;
    }
}

async function UploadFile(contributionId, filePath, fileName) {
    const folderId = await CreateFolder(contributionId);
    if (!folderId) return false;
    const { url, access_token } = await createUploadSession(folderId, fileName);
    if (!url) {
        console.log("Error uploading!");
        return;
    }
    const existingContribution = await Contribution.findOne({ contributionId });
    const file = fs.readFileSync(`${filePath}${fileName}`);
    const config = {
        headers: {
            "Content-Range": `bytes 0-${file.length - 1}/${file.length}`,
        },
    };
    try {
        const { data } = await axios.put(url, file, config);
        const createurllink = `https://graph.microsoft.com/v1.0/me/drive/items/${data.id}/createLink`;
        const thumbnaillink = `https://graph.microsoft.com/v1.0/me/drive/items/${data.id}/thumbnails`;
        const urldata = await axios.post(createurllink, {
            type: "view",
            scope: "organization"
        },
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                }
            }
        )
        const thumbnaildata = await axios.get(thumbnaillink,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }
        )
        const thumbnailurl = thumbnaildata.data.value?.[0]?.medium?.url;
        const webUrl = urldata?.data?.link?.webUrl;
        const fileData = new FileModel({
            isVerified: (existingContribution.approved) ? true : false, // The file is directly verified if the contribution is default approved
            fileId: data.id,                                          // which is what happens when BR makes a contribution
            size: data.size,
            thumbnail: thumbnailurl,
            name: fileName,
            downloadUrl: `${webUrl}?download=1`,
            webUrl: webUrl,
            // type: data.file?.mimeType,
        });
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
