import { combineReducers } from "redux";
import FileBroserReducer from "./filebrowser_reducer";
import UserReducer from "./user_reducer";
const reducers = combineReducers({
	fileBrowser: FileBroserReducer,
	user: UserReducer,
});

export default reducers;
