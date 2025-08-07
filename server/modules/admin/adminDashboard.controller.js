import AppError from "../../utils/appError.js";
import CourseModel from "../course/course.model.js";
import fs from "fs";
import csv from "csv-parser";

// Get all courses from DB
export async function getDBCourses(req, res, next) {
    try {
        const dbCourses = await CourseModel.find({});
        return res.json(dbCourses);
    } catch (err) {
        return next(new AppError(500, "Failed to fetch courses"));
    }
}

// Upload courses via CSV file (comma-separated)
export async function uploadCourses(req, res, next) {
    if (!req.file) return next(new AppError(400, "No file uploaded"));
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv(["code", "name"]))
        .on("data", (data) => results.push(data))
        .on("end", async () => {
            try {
                await Promise.all(
                    results.map(async ({ code, name }) => {
                        if (!code || !name) return null;
                        const codeUpper = code.trim().toUpperCase();
                        let course = await CourseModel.findOne({ code: new RegExp(`^${codeUpper}$`, 'i') });
                        if (!course) {
                            course = await CourseModel.create({ code: codeUpper, name });
                        } else {
                            course.code = codeUpper;
                            course.name = name;
                            await course.save();
                        }
                    })
                );
                fs.unlinkSync(req.file.path);
                // Fetch and return the full course list
                const allCourses = await CourseModel.find({});
                res.json(allCourses);
            } catch (err) {
                fs.unlinkSync(req.file.path);
                next(new AppError(500, "Failed to process CSV"));
            }
        });
}

// Rename a course
export async function renameCourse(req, res, next) {
    const { code } = req.params;
    const { name } = req.body;
    if (!name) return next(new AppError(400, "Name required"));
    // Use regex for case-insensitive and trimmed match
    const codeUpper = code.trim().toUpperCase();
    const course = await CourseModel.findOneAndUpdate(
        { code: new RegExp(`^${codeUpper}$`, 'i') },
        { name, code: codeUpper },
        { new: true }
    );
    if (!course) return next(new AppError(404, "Course not found"));
    res.json(course);
}