import { combineReducers } from "redux";
import displayReducer from "./displayReducer";
import courseReducer from "./courseReducer";
import userReducer from "./userReducer";

const reducers = combineReducers({
	user: userReducer,
	display: displayReducer,
	course: courseReducer,
});

export default reducers;
