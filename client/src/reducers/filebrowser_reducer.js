import data from "../data";
const FileBrowserReducer = (
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
			return { ...state, currentCourse: action.payload.currentCourse };
		case "UPDATE_COURSES":
			let arr = state.allCourseData;
			arr.push(action.payload.currentCourse);
			console.log(arr);
			localStorage.setItem("AllCourses", JSON.stringify(arr));
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

export default FileBrowserReducer;
