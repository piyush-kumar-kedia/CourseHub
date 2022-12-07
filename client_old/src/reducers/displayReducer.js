const displayReducer = (state = [], action) => {
	switch (action.type) {
		case "UPDATE_FILES":
			return [...action.payload];
		case "EMPTY_FILES":
			return [];
		default:
			return state;
	}
};

export default displayReducer;
