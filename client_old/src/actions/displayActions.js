import { EMPTY_FILES, UPDATE_FILES } from "../constants/STORE_CONSTANTS";
export const EmptyDisplay = () => {
	return {
		type: EMPTY_FILES,
		payload: [],
	};
};

export const UpdateFiles = (DATA) => {
	return {
		type: UPDATE_FILES,
		payload: [...DATA],
	};
};
