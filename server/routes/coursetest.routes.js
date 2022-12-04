//
// TEST ROUTES FOR COURSES
//
import express from "express";
import {
	getAllCourses,
	getCourse,
} from "../controllers/coursenew.controller.js";
const router = express.Router();

import catchAsync from "../utils/catchAsync.js";

router.get("/", catchAsync(getAllCourses));

// TEST : http://localhost:8080/course/6372986784fb43557d66e79d
router.get("/:courseId", catchAsync(getCourse));

export default router;
