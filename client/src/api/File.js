import axios from "axios";
import serverRoot from "./server";

// Create axios instance with baseURL and withCredentials
const API = axios.create({
    baseURL: `${serverRoot}/api`,
    withCredentials: true,
});

// Attach token to every request if available (from localStorage)
API.interceptors.request.use((req) => {
    const user = JSON.parse(localStorage.getItem("profile"));
    if (user) req.headers.Authorization = `Bearer ${user.token}`;
    return req;
});

// File Download (all)
export const downloadFile = async (fileId) => {
    const { data } = await API.get(`/file/download/${fileId}`);
    return data;
};

// File Preview (all)
export const previewFile = async (fileId) => {
    const { data } = await API.get(`/file/preview/${fileId}`);
    return data;
};

// Fetch Verified Files (for all users)
export const fetchAllFiles = async () => {
    const { data } = await API.get("/file/all");
    return data;
};

// Verify a file (BR only)
export const verifyFile = async (fileId) => {
    const { data } = await API.put(`/files/verify/${fileId}`);
    return data;
};

// Unverify (delete) a file (BR only)
export const unverifyFile = async (fileId) => {
    const { data } = await API.delete(`/files/unverify/${fileId}`);
    return data;
};
