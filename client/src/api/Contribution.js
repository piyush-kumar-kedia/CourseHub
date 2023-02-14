import axios from "axios";
axios.defaults.withCredentials = true;
import root from "./server";

export const CreateNewContribution = async (data) => {
    const resp = await axios.post(`${root}/api/contribution/`, data);
    return resp;
};
