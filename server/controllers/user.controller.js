import fs from "fs";
import axios from "axios";
import User from "../models/user.model.js";
import { validateUser } from "../models/user.model.js";
import AppError from "../utils/appError.js";

export const getUser = async (req, res, next) => {
	let access_token;
	access_token = fs.readFileSync("./access-token.token", "utf-8");

	var config = {
		method: "get",
		url: "https://graph.microsoft.com/v1.0/me",
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	};
	const response = await axios.get(config.url, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(401, "Access Denied");

	const roll = response.data.surname;
	if (!roll) throw new AppError(401, "Sign in using Institute Account");

	const existinguUser = await User.findOne({ rollNumber: roll });
	if (existinguUser) return res.json(existinguUser);

	const userData = {
		name: response.data.displayName,
		degree: response.data.jobTitle,
		rollNumber: response.data.surname,
		email: response.data.mail,
		branch: "calculate branch", //calculate branch
		semester: 2, //calculate sem
	};

	const { error } = validateUser(userData);
	if (error) throw new AppError(500, error.message);

	const user = new User(userData);
	const savedUser = await user.save();
	return res.json(savedUser);
};

//not used
export const createUser = async (req, res) => {
	const data = req.body;
	const user = new User(data);
	const savedUser = await user.save();
	res.json(savedUser);
};
