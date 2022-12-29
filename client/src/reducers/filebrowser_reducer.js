import data from "../data";
const FileBrowserReducer = (
    state = {
        currentCourse: null,
        currentCourseCode: null,
        currentFolder: null,
        currentYear: null,
        currentYearFolderStructure: [],
        allCourseData: [...data],
    },
    action
) => {
    switch (action.type) {
        case "LOAD_COURSES":
            return { ...state, allCourseData: action.payload.allCourseData };
        case "CHANGE_CURRENT_COURSE":
            return {
                ...state,
                currentCourse: action.payload.currentCourse,
                currentCourseCode: action.payload.currentCourseCode,
            };
        case "UPDATE_COURSES":
            let arr = state.allCourseData;
            if (
                !arr.find(
                    (course) =>
                        course.code?.toLowerCase() ===
                        action.payload.currentCourse.code.toLowerCase()
                )
            ) {
                arr.push(action.payload.currentCourse);
            }
            localStorage.setItem("AllCourses", JSON.stringify(arr));
            return {
                ...state,
                allCourseData: [...arr],
            };
        case "CHANGE_CURRENT_FOLDER":
            return { ...state, currentFolder: action.payload.currentFolder };
        case "CHANGE_CURRENT_YEAR_DATA":
            return {
                ...state,
                currentYear: action.payload.currentYear,
                currentYearFolderStructure: [...action.payload.currentYearFolderStructure],
            };
        case "RESET_FILE_BROWSER_STATE":
            return {
                ...state,
                currentCourse: null,
                currentCourseCode: null,
                currentFolder: null,
                currentYear: null,
            };
        default:
            return state;
    }
};

export default FileBrowserReducer;
