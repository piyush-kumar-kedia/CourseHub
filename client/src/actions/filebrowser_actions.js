export const ChangeCurrentCourse = (courseCode, courseCodeCode) => {
    return {
        type: "CHANGE_CURRENT_COURSE",
        payload: {
            currentCourse: courseCode,
            currentCourseCode: courseCodeCode,
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
