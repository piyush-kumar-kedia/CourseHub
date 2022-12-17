export const ChangeCurrentCourse = (courseData, courseCode) => {
    return {
        type: "CHANGE_CURRENT_COURSE",
        payload: {
            currentCourse: courseData,
            currentCourseCode: courseCode,
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

export const ChangeCurrentYearData = (_currYear, _folderStructure) => {
    return {
        type: "CHANGE_CURRENT_YEAR_DATA",
        payload: {
            currentYear: _currYear,
            currentYearFolderStructure: _folderStructure,
        },
    };
};
export const ResetFileBrowserState = () => {
    return {
        type: "RESET_FILE_BROWSER_STATE",
    };
};
