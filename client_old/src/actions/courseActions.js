import { CHANGE_COURSE, EMPTY_COURSE } from "../constants/STORE_CONSTANTS";
export const EmptyCourse = () => {
	return {
		type: EMPTY_COURSE,
		payload: [],
	};
};

export const ChangeCourse = (DATA) => {
	return {
		type: CHANGE_COURSE,
		payload: DATA,
	};
};
