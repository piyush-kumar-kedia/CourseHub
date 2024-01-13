import { Router } from "express";

import catchAsync from "../../utils/catchAsync.js";
const router = Router();

import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getOriginalCourses, getUserDifference } from "./snapshot.controller.js";

router.get("/diff/user", isAuthenticated, catchAsync(getUserDifference));

router.get("/course", isAuthenticated, catchAsync(getOriginalCourses));

export default router;
