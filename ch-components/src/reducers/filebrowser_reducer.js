import data from "../data";
const FileBroserReducer = (
	state = {
		currentCourse: null,
		currentFolder: null,
		allCourseData: [...data],
	},
	action
) => {
	switch (action.type) {
		case "LOAD_COURSES":
			return { ...state, allCourseData: action.payload.allCourseData };
		case "CHANGE_CURRENT_COURSE":
			// state.currentCourse = action.payload.currentCourse;
			return { ...state, currentCourse: action.payload.currentCourse };
		case "UPDATE_COURSES":
			// state.allCourseData.push(action.payload.currentCourse);
			let arr = state.allCourseData;
			arr.push(action.payload.currentCourse);
			// console.log(arr);
			console.log(action);
			return {
				...state,
				allCourseData: [...arr],
			};
		case "CHANGE_CURRENT_FOLDER":
			return { ...state, currentFolder: action.payload.currentFolder };
		default:
			return state;
	}
};

export default FileBroserReducer;
