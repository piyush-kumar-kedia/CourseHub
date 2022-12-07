export const ChangeCurrentCourse = (courseCode) => {
	return {
		type: "CHANGE_CURRENT_COURSE",
		payload: {
			currentCourse: courseCode,
		},
	};
};
export const UpdateCourses = (course) => {
	return {
		type: "UPDATE_COURSES",
		payload: {
			currentCourse: course,
		},
	};
};

export const ChangeFolder = (folder) => {
	return {
		type: "CHANGE_CURRENT_FOLDER",
		payload: {
			currentFolder: folder,
		},
	};
};
export const LoadCourses = (data) => {
	return {
		type: "LOAD_COURSES",
		payload: {
			allCourseData: data,
		},
	};
};
