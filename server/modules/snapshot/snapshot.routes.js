import { Router } from "express";

import catchAsync from "../../utils/catchAsync.js";
const router = Router();

import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getUserDifference } from "./snapshot.controller.js";

router.get("/diff/user", isAuthenticated, catchAsync(getUserDifference));


export default router;
