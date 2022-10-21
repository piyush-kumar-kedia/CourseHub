import "dotenv/config";
import cors from "cors";

import express from "express";

import AppError from "./utils/appError.js";
import catchAsync from "./utils/catchAsync.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";

const app = express();

const PORT = config.port;

// Error handler
app.use((err, req, res, next) => {
	logger.error(err.message ? err.message : err);
	const { status = 500, message = "Something went wrong!" } = err;
	return res.status(status).json({
		error: true,
		message: message,
	});
});

app.listen(PORT, () => {
	logger.info(`Server on PORT ${PORT}`);
});
