import { LOGIN_USER, LOGOUT_USER } from "../constants/STORE_CONSTANTS";

export const LogoutUser = () => {
	return {
		type: LOGOUT_USER,
		payload: null,
	};
};

export const LoginUser = (DATA) => {
	return {
		type: LOGIN_USER,
		payload: DATA,
	};
};
