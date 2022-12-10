import axios from "axios";
axios.defaults.withCredentials = true;

export const getCourse = async (code) => {
	const resp = await axios.get(`http://localhost:8080/course/${code}`);
	return resp;
};
