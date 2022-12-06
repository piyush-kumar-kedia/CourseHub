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
		default:
			return state;
	}
};

export default FileBroserReducer;
