import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import validate from "../../utils/validateSchema";
import { generateCodeRequestSchema, loginRequestSchema } from "./auth.schema";
import controller from "./auth.controller";

const router = Router();

router.post(
    "/generateOTP",
    validate(generateCodeRequestSchema),
    catchAsync(controller.generateOTP)
);
router.post("/login", validate(loginRequestSchema), catchAsync(controller.login));
router.post("/logout", catchAsync(controller.logout));

export default router;
