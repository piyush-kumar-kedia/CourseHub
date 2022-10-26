import express, { json } from "express";
import axios from "axios";
import fs from "fs";
const router = express.Router();

const scope = "User.read offline_acess Mail.read";
import qs from "querystring";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

const clientid = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_VALUE;
const redirect_uri = "http://localhost:8080/login/redirect/";

router.get("/login", (req, res) => {
	res.redirect(
		`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientid}&response_type=code&redirect_uri=${redirect_uri}&scope=offline_access%20user.read%20mail.read&state=12345&prompt=consent`
	);
});

router.get(
	"/login/redirect/",
	catchAsync(async (req, res, next) => {
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

		fs.writeFileSync("./access-token.token", `${AccessToken}`, (err) => {
			if (err)
				throw new AppError(500, "Failed to write Acess Token" + err);
		});
		fs.writeFileSync("./refresh_token.token", `${RefreshToken}`, (err) => {
			if (err)
				throw new AppError(500, "Failed to write Refresh Token" + err);
		});

		return res.redirect("/homepage");
	})
);

export default router;
