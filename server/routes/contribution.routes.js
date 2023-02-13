import express from "express";
const router = express.Router();
import ContributionController from "../controllers/contribution.controller.js";
import catchAsync from "../utils/catchAsync.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

router.get("/", ContributionController.GetAllContributions);
router.post("/", catchAsync(ContributionController.CreateNewContribution));
router.post("/upload", catchAsync(ContributionController.HandleFileUpload));
// router.get("/:id", catchAsync(ContributionController.CreateNewContribution));

export default router;
