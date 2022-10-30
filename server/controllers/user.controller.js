import User from "../models/user.model.js";

export const getUser = async (req, res, next) => {
	return res.json(req.user);
};

//not used
export const createUser = async (req, res) => {
	const data = req.body;
	const user = new User(data);
	const savedUser = await user.save();
	res.json(savedUser);
};
