import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import isAdmin from "../../middleware/isAdmin.js";
import TimeTable from "./timetable.model.js";
import { fetchCourses } from "../auth/auth.controller.js";
const router = Router();

import data from "./data.js";
import AppError from "../../utils/appError.js";
// router.post(
//     "/",
//     // isAuthenticated,
//     catchAsync(async (req, res, next) => {
//         let { words } = req.body;

//         const agg = await SearchResult.getSearchResults(words);
//         const payload = [];
//         agg.forEach((item) => {
//             if (item.numberOfWordsMatched > 0 || item.codeMatch) payload.push(item);
//         });
//         return res.status(200).json({ found: payload.length > 0 ? true : false, results: payload });
//     })
// );

router.get(
    "/feed",
    isAdmin,
    // isAuthenticated,
    catchAsync(async (req, res, next) => {
        data.map(async (roomInfo) => await TimeTable.create(roomInfo));
        console.log("done");
        res.json(data);
    })
);

router.get(
    "/courses",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        let roll = req.user.rollNumber;
        let toReturn = [];
        // let courses = req.user.courses;
        let courses = await fetchCourses(req.user.rollNumber);
        res.json(courses);
    })
);

router.get(
    "/",
    isAuthenticated,
    catchAsync(async (req, res, next) => {
        let roll = req.user.rollNumber;
        let toReturn = [];
        // let courses = req.user.courses;
        let courses = req.user.courses;
        for (let i = 0; i < courses.length; ++i) {
            // req.user.courses.map(async (course, idx) => {
            let course = courses[i];
            const all = await TimeTable.findOne({ code: course.code.toUpperCase(), all: true });
            const individual = await TimeTable.findOne({
                code: course.code.toUpperCase(),
                individual: roll,
            });
            const fromTo = await TimeTable.findOne({
                $and: [
                    { code: course.code.toUpperCase() },
                    { $and: [{ from: { $lte: roll } }, { to: { $gte: roll } }] },
                ],
            });

            // console.log(course);
            if (all) {
                // toReturn[course.code] = all;
                toReturn.push({
                    ...all._doc,
                    name: course.name,
                    found: true,
                    to: 222222222,
                    from: 222222222,
                });
            } else if (individual) {
                // toReturn[course.code] = individual;
                toReturn.push({
                    ...individual._doc,
                    name: course.name,
                    found: true,
                    to: 222222222,
                    from: 222222222,
                });
            } else if (fromTo) {
                // toReturn[course.code] = fromTo;
                toReturn.push({ ...fromTo._doc, name: course.name, found: true });
            } else {
                // toReturn[course.code] = { notFound: true };
                toReturn.push({
                    code: course.code,
                    found: false,
                    name: course.name,
                    to: 222222222,
                    from: 222222222,
                });
            }
            // console.log(toReturn);
        }
        return res.json({ data: toReturn, date: "18th Sept-24th Sept",exam:"Mid-Semester"});
    })
);

// router.get(
//     "/available",
//     // isAuthenticated,
//     catchAsync(async (req, res, next) => {
//         const availableCourses = await SearchResult.find({ isAvailable: true });
//         return res.json(availableCourses);
//     })
// );

// router.post(
//     "/isavailable",
//     // isAuthenticated,
//     catchAsync(async (req, res, next) => {
//         const { code } = req.body;
//         const course = await SearchResult.findOne({ code: code?.toLowerCase() });
//         if (!course) return res.json({ isAvailable: false });
//         return res.json({ isAvailable: course.isAvailable });
//     })
// );

export default router;
