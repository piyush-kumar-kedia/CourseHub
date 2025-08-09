import express from "express";
import { createFolder,deleteFolder,getFolderContent } from "./folder.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import  {isBR}  from "../../middleware/isBR.js"; // if it's a named export

const router = express.Router();

router.post("/create", isAuthenticated, isBR, createFolder);
router.delete("/delete", isAuthenticated, isBR, deleteFolder);
router.get("/content/:folderId", getFolderContent);

export default router;
