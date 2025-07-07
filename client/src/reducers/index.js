import { combineReducers } from "redux";
import FileBrowserReducer from "./filebrowser_reducer";
import UserReducer from "./user_reducer";
import url_reducer from "./url_reducer";
const reducers = combineReducers({
    fileBrowser: FileBrowserReducer,
    user: UserReducer,
    URLS: url_reducer,
});

export default reducers;
