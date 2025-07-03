import express from "express";
import {
    createBR,
    getAll,
    deleteBR
} from "./br.controller.js";

const router = express.Router();

router.post("/create", createBR);
router.get("/all", getAll);
router.delete("/delete", deleteBR);

export default router;