export const LoginUser = (data) => {
    return {
        type: "LOG_IN",
        payload: {
            user: data,
        },
    };
};

export const LogoutUser = () => {
    return {
        type: "LOG_OUT",
    };
};
export const UpdateFavourites = (favourites) => {
    return {
        type: "UPDATE_FAVOURITES",
        payload: {
            favourites: favourites,
        },
    };
};

export const AddNewCourseLocal = (course) => {
    return {
        type: "ADD_COURSE_LOCAL",
        payload: {
            course: course,
        },
    };
};
