import "dotenv/config";
import cors from "cors";
import express from "express";
import AppError from "./utils/appError.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

import connectDatabase from "./services/connectDB.js";
connectDatabase();
import onedriveRoutes from "./routes/onedrive/onedrive.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import fs from "fs";

const app = express();
const PORT = config.port;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/", authRoutes);
app.use("/api/user", userRoutes);
app.use("/onedrive/", onedriveRoutes);
app.use("/", coursesRoutes);

app.use(
	"/homepage",
	catchAsync(async (req, res, next) => {
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
		// console.log(response);

		if (!response.data) throw new AppError(401, "Access Denied");

		res.json(response.data);
	})
);

// Error handler
app.use((err, req, res, next) => {
	logger.error(err.message);
	const { status = 500, message = "Something went wrong!" } = err;
	return res.status(status).json({
		error: true,
		message: message,
	});
});

app.listen(PORT, () => {
	logger.info(`Server on PORT ${PORT}`);
});
