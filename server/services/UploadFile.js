import fs from "fs";
import { getAccessToken } from "../routes/onedrive/onedrive.routes.js";
import axios from "axios";

async function createUploadSession(fileWithExtension) {
    const access_token = await getAccessToken();
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/01OXYV377R7YXVWNCI5VDYWVFUYAMRFGOG:/${fileWithExtension}:/createUploadSession`;
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

async function UploadFile(fileWithExtension) {
    const url = await createUploadSession(fileWithExtension);
    if (!url) {
        console.log("Error uploading!");
        return;
    }
    const file = fs.readFileSync(`./external/contributions/${fileWithExtension}`);
    const config = {
        headers: {
            "Content-Range": `bytes 0-${file.length - 1}/${file.length}`,
        },
    };
    try {
        const { data } = await axios.put(url, file, config);
        return data;
    } catch (error) {
        console.log(error);
        console.log("Error uploading!");
    }
}

export default UploadFile;
