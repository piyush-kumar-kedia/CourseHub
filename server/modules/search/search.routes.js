import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import SearchResult from "./search.model.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
const router = Router();
import CourseModel from "../course/course.model.js";



// router.post(
//     "/",
//     catchAsync(async (req, res, next) => {
//         let { code } = req.body;
//         code = code.toLowerCase();
//         if (!code) return res.sendStatus(400);
//         const fetched = await SearchResult.findOne({ code: code });
//         if (!fetched) return res.status(200).json({ found: false });
//         return res.status(200).json({
//             found: true,
//             id: fetched._id,
//             name: fetched.name,
//             code: fetched.code,
//             isAvailable: fetched.isAvailable,
//         });
//     })
// );

router.post(
    "/",
    // isAuthenticated,
    catchAsync(async (req, res, next) => {
        let { words } = req.body;
        const searchWords = words.map((w) => w.toLowerCase());
        const allCourses = await CourseModel.find().select("code name");

        const payload = allCourses
            .map((course) => {
                const matchCount = searchWords.reduce((acc, word) => {
                    if (
                        course.code.toLowerCase().includes(word) ||
                        course.name.toLowerCase().includes(word)
                    ) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);
                return { code: course.code, name: course.name, matchCount };
            })
            .filter((course) => course.matchCount > 0)
            .sort((a, b) => b.matchCount - a.matchCount);

        return res.status(200).json({ found: payload.length > 0, results: payload });

        // const agg = await SearchResult.getSearchResults(words);
        // const payload = [];
        // agg.forEach((item) => {
        //     if (item.numberOfWordsMatched > 0 || item.codeMatch) payload.push(item);
        // });
        // return res.status(200).json({ found: payload.length > 0 ? true : false, results: payload });
    })
);

router.post(
    "/feed",
    // isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { name, code } = req.body;
        const savedDocument = await SearchResult.create({
            name: name.toLowerCase(),
            code: code.toLowerCase(),
        });
        res.json(savedDocument);
    })
);

router.get(
    "/available",
    // isAuthenticated,
    catchAsync(async (req, res, next) => {
        const availableCourses = await SearchResult.find({ isAvailable: true });
        return res.json(availableCourses);
    })
);

router.post(
    "/isavailable",
    // isAuthenticated,
    catchAsync(async (req, res, next) => {
        const { code } = req.body;
        const course = await SearchResult.findOne({ code: code?.toLowerCase() });
        if (!course) return res.json({ isAvailable: false });
        return res.json({ isAvailable: course.isAvailable });
    })
);

export default router;
