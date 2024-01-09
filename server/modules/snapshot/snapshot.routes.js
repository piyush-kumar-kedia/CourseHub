import { Router } from "express";

import catchAsync from "../../utils/catchAsync.js";
const router = Router();

import isAuthenticated from "../../middleware/isAuthenticated.js";
import { getUserDifference, updateUserSnapshot } from "./snapshot.controller.js";

router.get("/diff/user", isAuthenticated, catchAsync(getUserDifference));
router.post("/update/user", isAuthenticated, catchAsync(updateUserSnapshot));

export default router;
