import axios from "axios";
axios.defaults.withCredentials = true;
import root from "./server";

export const CreateNewContribution = async (data) => {
    // console.log(data);
    const resp = await axios.post(`${root}/api/contribution/`, data);
    return resp;
};
export const GetMyContributions = async () => {
    const resp = await axios.get(`${root}/api/contribution/`);
    return resp;
};
