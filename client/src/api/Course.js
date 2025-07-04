import axios from "axios";
axios.defaults.withCredentials = true;
import root from "./server";

export const getCourse = async (code) => {
    const resp = await axios.get(`${root}/api/course/${code}`);
    return resp;
};

export const getUserCourses = async (courses) => {
    try{        
        const resp = await axios.get(`${root}/api/course/getUserCourses`, {
            params: {
                courses: courses,
            }
        });
        return resp.data;
    }
    catch(err){
        console.log("Error:", err.message);
    }
}
