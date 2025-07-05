import express from "express";
import {
    deleteCourseByCode,
    getAllCourses,
    getCourse,
    isCourseUpdated,
} from "./course.controller.js";
const router = express.Router();

import catchAsync from "../../utils/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";

router.get("/", catchAsync(getAllCourses));
router.get("/delete/:code", catchAsync(deleteCourseByCode));
router.post("/isUpdated", isAuthenticated, catchAsync(isCourseUpdated));
router.get("/:code", catchAsync(getCourse));

export default router;
