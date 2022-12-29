const UserReducer = (
    state = {
        loggedIn: false,
        user: {},
        localCourses: [
            // {
            //     _id: "638f1709897b3c84b7d8d32c",
            //     name: "Introduction to Engineering Drawing",
            //     code: "ce101",
            //     color: "#DBCEFF",
            // },
            // {
            //     _id: "638f1709897b3c84b7d8d32d",
            //     name: "Real Analysis",
            //     code: "ma101",
            //     color: "#6F8FFE",
            // },
        ],
        favourites: [],
    },
    action
) => {
    switch (action.type) {
        case "LOG_IN":
            return {
                ...state,
                loggedIn: true,
                user: action.payload.user,
                favourites: action.payload.user.favourites,
            };
        case "LOG_OUT":
            return { ...state, loggedIn: false };
        case "UPDATE_FAVOURITES":
            return { ...state, favourites: action.payload.favourites };
        case "ADD_COURSE_LOCAL":
            if (state.localCourses?.find((course) => course.code === action.payload.course.code))
                return state;
            try {
                let localCourses = JSON.parse(window.sessionStorage.getItem("LocalCourses"));
                if (
                    !localCourses?.find(
                        (course) =>
                            course.code?.toLowerCase() === action.payload.course.code.toLowerCase()
                    )
                ) {
                    window.sessionStorage.setItem(
                        "LocalCourses",
                        JSON.stringify([...state.localCourses, action.payload.course])
                    );
                }
            } catch (error) {
                console.log(error);
            }
            return { ...state, localCourses: [...state.localCourses, action.payload.course] };
        case "LOAD_LOCAL_COURSES":
            return { ...state, localCourses: [...state.localCourses, ...action.payload.courses] };
        default:
            return state;
    }
};

export default UserReducer;
