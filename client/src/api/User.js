import axios from "axios";
import serverRoot from "./server";

axios.defaults.withCredentials = true;

export const getUser = async () => {
    const resp = await axios.get(`${serverRoot}/api/user`);
    return resp;
};

export const handleLogin = () => {
    window.location =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c6c864ac-cced-4be6-8657-ca15170e7b51&response_type=code&redirect_uri=http://localhost:8080/login/redirect/&scope=offline_access%20user.read&state=12345&prompt=consent";
};
export const AddNewCourseAPI = async (code, name) => {
    const resp = await axios.post(`${serverRoot}/api/user/course`, { code, name });
    console.log(resp);
    return resp;
};

export const AddToFavourites = async (id, name, path, code) => {
    const data = {
        id: id,
        name: name,
        path: path,
        code: code,
    };
    const resp = await axios.post(`${serverRoot}/api/user/favourites`, data);
    console.log(resp);
    return resp;
};
export const RemoveFromFavourites = async (id) => {
    const resp = await axios.delete(`${serverRoot}/api/user/favourites/${id}`);
    console.log(resp);
    return resp;
};
