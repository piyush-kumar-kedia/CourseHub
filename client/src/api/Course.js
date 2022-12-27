import axios from "axios";
axios.defaults.withCredentials = true;
import root from "./server";
export const getCourse = async (code) => {
    const resp = await axios.get(`${root}/course/${code}`);
    return resp;
};
