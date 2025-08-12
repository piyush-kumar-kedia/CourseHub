import axios from "axios";
import serverRoot from "./server";

// Create axios instance with baseURL and withCredentials
const API = axios.create({
    baseURL: `${serverRoot}/api`,
    withCredentials: true,
});

API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) req.headers.Authorization = `Bearer ${user.token}`;
    return req;
});

export const createFolder = async ({ name, course, parentFolder, childType }) => {
    const { data } = await API.post("/folder/create", {
        name,
        course,
        parentFolder,
        childType,
    });
    return data;
};

export const deleteFolder = async ({ folder, parentFolderId }) => {
    const { data } = await API.delete(`/folder/delete`, {
        data: { folder, parentFolderId },
    });
    return data;
};

export const fetchFolder = async (folderId) => {
    const response = await API.get(`/folder/content/${folderId}`);
    if (response.status !== 200) {
        throw new Error("Failed to fetch folder data");
    }
    const data = response.data;
    return data;
}
