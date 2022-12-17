import { combineReducers } from "redux";
import FileBroserReducer from "./filebrowser_reducer";
import UserReducer from "./user_reducer";
import url_reducer from "./url_reducer";
const reducers = combineReducers({
    fileBrowser: FileBroserReducer,
    user: UserReducer,
    URLS: url_reducer,
});

export default reducers;
