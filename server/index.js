import "dotenv/config";
import cors from "cors";
import express from "express";
import AppError from "./utils/appError.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectDatabase from "./services/connectDB.js";
connectDatabase();

const app = express();
const PORT = config.port;

app.use(express.json());

app.use("/", authRoutes);
app.use("/api/user", userRoutes);

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
