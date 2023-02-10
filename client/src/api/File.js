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
