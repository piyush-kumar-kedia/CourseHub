import "dotenv/config";
import cors from "cors";
import express from "express";
import AppError from "./utils/appError.js";
import logger from "./utils/logger.js";
import config from "./config/default.js";
import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/user/user.routes.js";
import cookieParser from "cookie-parser";
import catchAsync from "./utils/catchAsync.js";
import User from "./modules/user/user.model.js";
import ua from "express-useragent";
import http from "http";
import fs from "fs";
import connectDatabase from "./services/connectDB.js";
connectDatabase();
import onedriveRoutes from "./modules/onedrive/onedrive.routes.js";
import courseRoutes from "./modules/course/course.routes.js";
import searchRoutes from "./modules/search/search.routes.js";
import eventRoutes from "./modules/event/event.routes.js";
import contributionRoutes from "./modules/contribution/contribution.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";
import timeTableRoutes from "./modules/timetable/timetable.routes.js";
import miscellaneousRoutes from "./modules/miscellaneous/miscellaneous.routes.js";
import codingweekRoutes from "./modules/codingweek/codingweek.routes.js";
import syllabusRoutes from "./modules/syllabus/syllabus.routes.js";
import attendenceRoutes from "./modules/attendence/attendence.routes.js";
import scheduleRoutes from "./modules/schedule/schedule.routes.js";
import snapshotRoutes from "./modules/snapshot/snapshot.routes.js";
import brRoutes from "./modules/br/br.routes.js";
import fileRoutes from "./modules/file/file.routes.js";
import folderRoutes from "./modules/folder/folder.routes.js";
import yearRoutes from "./modules/year/year.routes.js";

const app = express();

const PORT = config.port;
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.static("static"));
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
// app.use(cors());
app.use(ua.express());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/file", onedriveRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/contribution", contributionRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/miscellaneous", miscellaneousRoutes);
app.use("/api/timetable", timeTableRoutes);
app.use("/api/codingweek", codingweekRoutes);
app.use("/api/syllabus", syllabusRoutes);
app.use("/api/attendence", attendenceRoutes);
app.use("/api/schedule", scheduleRoutes);
app.use("/api/snapshot", snapshotRoutes);
app.use("/api/br", brRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folder", folderRoutes);
app.use("/api/year", yearRoutes);

app.use(
    "/homepage",
    catchAsync(async (req, res, next) => {
        let jwtToken = req.cookies.token;
        const user = await User.findByJWT(jwtToken);
        if (!user) return res.redirect(config.clientURL);
        res.json(user);
    })
);

// Error handler
app.use((err, req, res, next) => {
    logger.error(err.message);
    console.log(err);
    const { status = 500, message = "Something went wrong!" } = err;
    return res.status(status).json({
        error: true,
        message: message,
    });
});

// Set static folder
app.use(express.static("static"));

app.get("*", (req, res) => {
    if (req.useragent?.isAndroid) {
        return res.redirect(
            "https://play.google.com/store/apps/details?id=com.codingclub.coursehub"
        );
    } else if (req.useragent?.isiPhone) {
        return res.redirect("https://apps.apple.com/us/app/coursehub/id6447286863");
    }
    res.sendFile(path.resolve(__dirname, "static", "index.html"));
});

app.listen(PORT, () => {
    logger.info(`Server on PORT ${PORT}`);
});
