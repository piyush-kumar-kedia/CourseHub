import express from "express";
import { getAllFiles, verifyFile, unverifyFile } from "./file.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import { isBR } from "../../middleware/isBR.js"; // if it's a named export

const router = express.Router();

router.get("/all", isAuthenticated, getAllFiles);
router.put("/verify/:id", isAuthenticated, isBR, verifyFile);
// router.delete("/unverify/:id", isAuthenticated, isBR, unverifyFile);
router.delete("/unverify/:id", unverifyFile);

export default router;
