import axios from "axios";
import serverRoot from "./server";

export const GetSearchResult = async (code) => {
    const fetched = await axios.post(`${serverRoot}/search`, {
        code: code,
    });
    return fetched;
};
