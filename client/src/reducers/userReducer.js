import { LOGIN_USER, LOGOUT_USER } from "../constants/STORE_CONSTANTS";

const userReducer = (state = null, action) => {
	switch (action.type) {
		case LOGIN_USER:
			return action.payload;
		case LOGOUT_USER:
			return null;
		default:
			return state;
	}
};
export default userReducer;
