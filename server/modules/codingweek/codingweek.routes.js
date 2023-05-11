import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import data from "./data.js";
const router = Router();

router.get(
    "/contributions",
    catchAsync(async (req, res, next) => {
        res.json(data);
    })
);

export default router;
