import { Router, Request, Response, NextFunction } from "express";
import catchAsync from "../../utils/catchAsync";
import controller from "./admin.controller";
import validate from "../../utils/validateSchema";
import { createAdminRequestSchema } from "./admin.schema";
import isAdmin from "../../middlewares/isAdmin";

const router = Router();

// TODO : Make routes private
router.get("/", isAdmin, catchAsync(controller.getAdminDetails));
router.post("/", validate(createAdminRequestSchema), catchAsync(controller.createAdmin));

export default router;
