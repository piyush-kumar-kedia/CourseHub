const UserReducer = (
	state = {
		loggedIn: false,
		user: {},
		myCourses: [
			{
				_id: "638f1709897b3c84b7d8d32c",
				name: "Introduction to Engineering Drawing",
				code: "ce101",
				color: "#DBCEFF",
			},
			{
				_id: "638f1709897b3c84b7d8d32d",
				name: "Real Analysis",
				code: "ma101",
				color: "#6F8FFE",
			},
		],
	},
	action
) => {
	switch (action.type) {
		case "LOG_IN":
			return { ...state, loggedIn: true, user: action.payload.user };
		case "LOG_OUT":
			return { ...state, loggedIn: false };
		default:
			return state;
	}
};

export default UserReducer;
