import axios from "axios";
import qs from "querystring";
import AppError from "../utils/appError.js";

import appConfig from "../config/default.js";

const clientid = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_VALUE;
const redirect_uri = "http://localhost:8080/login/redirect/";

import {
	findUserWithRollNumber,
	getUserFromToken,
	validateUser,
} from "../models/user.model.js";

import User from "../models/user.model.js";

//not used
export const loginHandler = (req, res) => {
	res.redirect(
		`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientid}&response_type=code&redirect_uri=${redirect_uri}&scope=offline_access%20user.read&state=12345&prompt=consent`
	);
};

export const redirectHandler = async (req, res, next) => {
	const { code } = req.query;

	var data = qs.stringify({
		client_secret: clientSecret,
		client_id: clientid,
		redirect_uri: redirect_uri,
		scope: "user.read",
		grant_type: "authorization_code",
		code: code,
	});

	var config = {
		method: "post",
		url: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			client_secret: clientSecret,
		},
		data: data,
	};
	const response = await axios.post(config.url, config.data, {
		headers: config.headers,
	});

	if (!response.data) throw new AppError(500, "Something went wrong");

	const AccessToken = response.data.access_token;
	const RefreshToken = response.data.refresh_token;

	const userFromToken = await getUserFromToken(AccessToken);

	if (!userFromToken || !userFromToken.data)
		throw new AppError(401, "Access Denied");

	const roll = userFromToken.data.surname;
	if (!roll) throw new AppError(401, "Sign in using Institute Account");

	let existingUser = await findUserWithRollNumber(roll);

	if (!existingUser) {
		const userData = {
			name: userFromToken.data.displayName,
			degree: userFromToken.data.jobTitle,
			rollNumber: userFromToken.data.surname,
			email: userFromToken.data.mail,
			branch: "calculate branch", //calculate branch
			semester: 2, //calculate sem
		};

		const { error } = validateUser(userData);
		if (error) throw new AppError(500, error.message);

		const user = new User(userData);
		existingUser = await user.save();
	}

	const token = existingUser.generateJWT();

	res.cookie("token", token, {
		maxAge: 900000,
		sameSite: "lax",
		secure: false,
		httpOnly: true,
	});

	return res.redirect(appConfig.clientURL);
};

export const logoutHandler = (req, res, next) => {
	res.clearCookie("token");
	res.redirect(appConfig.clientURL);
};
