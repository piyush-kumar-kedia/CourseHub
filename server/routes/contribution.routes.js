import express from "express";
const router = express.Router();
import ContributionController from "../controllers/contribution.controller.js";
import catchAsync from "../utils/catchAsync.js";

router.get("/", ContributionController.GetAllContributions);
router.post("/", catchAsync(ContributionController.CreateNewContribution));
// router.get("/:id", catchAsync(ContributionController.CreateNewContribution));

export default router;
