import "dotenv/config";
import cors from "cors";
import express from "express";
import AppError from "./utils/appError.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import catchAsync from "./utils/catchAsync.js";
import User from "./models/user.model.js";

import connectDatabase from "./services/connectDB.js";
connectDatabase();
import onedriveRoutes from "./routes/onedrive/onedrive.routes.js";
import coursesRoutes from "./routes/courses.routes.js";

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
		let jwtToken = req.cookies.token;
		const user = await User.findByJWT(jwtToken);
		if (!user) return res.redirect(config.clientURL);
		res.json(user);
	})
);
// app.get("/", async (req, res, next) => {
// 	const file = await FileModel.create({
// 		name: "Lecture 2 CH212",
// 		type: "video",
// 		data: "hehe",
// 	});
// 	const file3 = await FileModel.create({
// 		name: "Lecture 3 CH212",
// 		type: "video",
// 		data: "hehe",
// 	});
// 	const file2 = await FileModel.create({
// 		name: "slide lec 2 CH212",
// 		type: "pdf",
// 		data: "hoho",
// 	});
// 	const folder = await FolderModel.create({ data: [file._id, file3._id] });
// 	const folder2 = await FolderModel.create({ data: [file2._id] });

// 	const c = await CourseModel.create({
// 		name: "CH212",
// 		folders: [
// 			{ name: "lectures", data: folder._id },
// 			{ name: "slides", data: folder2._id },
// 		],
// 	});
// 	res.json(c);
// });

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
