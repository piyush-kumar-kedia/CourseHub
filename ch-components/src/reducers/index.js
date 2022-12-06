import { combineReducers } from "redux";
import FileBroserReducer from "./filebrowser_reducer";
const reducers = combineReducers({
	fileBrowser: FileBroserReducer,
});

export default reducers;
