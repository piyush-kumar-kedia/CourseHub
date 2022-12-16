import axios from "axios";
axios.defaults.withCredentials = true;
export const donwloadFile = async (fileId) => {
    const { data } = await axios.get(`http://localhost:8080/onedrive/download/${fileId}`);
    return data;
};

export const previewFile = async (fileId) => {
    const { data } = await axios.get(`http://localhost:8080/onedrive/weburl/${fileId}`);
    return data;
};
