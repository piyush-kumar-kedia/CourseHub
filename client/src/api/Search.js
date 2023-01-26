import axios from "axios";
import serverRoot from "./server";

export const GetSearchResult = async (wordArr) => {
    const fetched = await axios.post(`${serverRoot}/search`, {
        words: wordArr,
    });
    return fetched;
};
