import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import miscellaneousController from "./miscellaneous.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import multer from "multer";

const router = Router();
const upload = multer();

router.get("/fun-facts", catchAsync(miscellaneousController.GetFunFacts));
router.get("/privacy-policy", catchAsync(miscellaneousController.GetPrivacyPolicy));
router.post(
    "/report",
    isAuthenticated,
    upload.array("screenshots"),
    catchAsync(miscellaneousController.PostFeedBack)
);

export default router;
