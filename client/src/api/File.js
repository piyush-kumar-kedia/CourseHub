import axios from "axios";
axios.defaults.withCredentials = true;
import serverRoot from "./server";

export const donwloadFile = async (fileId) => {
    const { data } = await axios.get(`${serverRoot}/api/file/download/${fileId}`);
    return data;
};

export const previewFile = async (fileId) => {
    const { data } = await axios.get(`${serverRoot}/api/file/preview/${fileId}`);
    return data;
};

export const getThumbnail = async (fileId) => {
    const resp = await axios.post(`${serverRoot}/api/file/thumbnail`, {
        fileId: fileId,
    });
    console.log("Thumbnail Refreshed");
}
