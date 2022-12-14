import axios from "axios";

axios.defaults.withCredentials = true;

export const getUser = async () => {
    const resp = await axios.get("http://localhost:8080/api/user");
    return resp;
};

export const handleLogin = () => {
    window.location =
        "https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=c6c864ac-cced-4be6-8657-ca15170e7b51&response_type=code&redirect_uri=http://localhost:8080/login/redirect/&scope=offline_access%20user.read&state=12345&prompt=consent";
};

export const AddToFavourites = () => {
    return;
};
