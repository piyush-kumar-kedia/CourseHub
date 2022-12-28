import { Router } from "express";
import catchAsync from "../utils/catchAsync.js";
import SearchResult from "../models/search.model.js";
const router = Router();

router.post(
    "/",
    catchAsync(async (req, res, next) => {
        let { code } = req.body;
        code = code.toLowerCase();
        if (!code) return res.sendStatus(400);
        const fetched = await SearchResult.findOne({ code: code });
        if (!fetched) return res.status(200).json({ found: false });
        return res.status(200).json({
            found: true,
            id: fetched._id,
            name: fetched.name,
            code: fetched.code,
            isAvailable: fetched.isAvailable,
        });
    })
);
export default router;
