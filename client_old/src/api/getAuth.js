import axios from "axios";
const getAuth = async () => {
	try {
		const resp = await axios.get("/api/user");
		if (resp.data.error) {
			return false;
		}
		if (!resp.data) {
			return false;
		}
		return resp.data;
	} catch (error) {
		return false;
	}
};

export default getAuth;
