import express from "express";
import {
    updateBRs,
    createBR,
    getAll,
    deleteBR
} from "./br.controller.js";

const router = express.Router();

router.post("/updateList", updateBRs);
router.post("/create", createBR);
router.get("/all", getAll);
router.delete("/delete", deleteBR);

export default router;