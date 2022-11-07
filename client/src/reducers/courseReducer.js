import { CHANGE_COURSE, EMPTY_COURSE } from "../constants/STORE_CONSTANTS";

const fileBrowserReducer = (state = { courseId: "", folders: [] }, action) => {
	switch (action.type) {
		case CHANGE_COURSE:
			return {
				courseId: action.payload.courseId,
				folders: [...action.payload.data],
			};
		case EMPTY_COURSE:
			return {
				courseId: "",
				folders: [],
			};
		default:
			return state;
	}
};

export default fileBrowserReducer;
