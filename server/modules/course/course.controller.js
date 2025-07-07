import AppError from "../../utils/appError.js";
import CourseModel, { FolderModel, FileModel } from "./course.model.js";
import logger from "../../utils/logger.js";
import SearchResults from "../search/search.model.js";
import { response } from "express";
export const getCourse = async (req, res, next) => {
    const { code } = req.params;
    logger.info(`GET /course/${code}`);

    if (!code) throw new AppError(400, "Missing Course Id");
    const course = await CourseModel.findOne({ code: code })
        .populate({
            path: "children",
            select: "-__v",
            populate: {
                path: "children",
                select: "-__v",
                populate: {
                    strictPopulate: false,
                    path: "children",
                    select: "-__v",
                    populate: {
                        strictPopulate: false,
                        path: "children",
                        select: "-__v",
                        populate: {
                            strictPopulate: false,
                            path: "children",
                            select: "-__v",
                            populate: {
                                strictPopulate: false,
                                path: "children",
                                select: "-__v",
                                populate: {
                                    strictPopulate: false,
                                    path: "children",
                                    select: "-__v",
                                    populate: {
                                        strictPopulate: false,
                                        path: "children",
                                        select: "-__v",
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        .select("-__v");

    if (!course) return res.json({ found: false });
    return res.json({ found: true, ...course["_doc"] });
};

export const deleteCourseByCode = async (req, res, next) => {
    const { code } = req.params;
    if (!code) throw new AppError(400, "Missing Course Id");
    const search = await SearchResults.findOne({ code: code.toLowerCase() });
    await FolderModel.deleteMany({ course: code.toLowerCase() });
    await FileModel.deleteMany({
        course: `${code.toLowerCase()} - ${search.modelName.toLowerCase()}`,
    });
    await CourseModel.deleteOne({ code: code.toLowerCase() });
    res.sendStatus(200);
};

// update course
// delete existing course -> fetch new structure from onedrive

export const getAllCourses = async (req, res, next) => {
    const allCourse = await CourseModel.find().select("_id name code");

    res.json(allCourse);
};

export const isCourseUpdated = async (req, res, next) => {
    let { clientOn } = req.body;
    if (!clientOn) return next(new AppError(500, "Invalid data provided!"));
    let outdatedOnClient = [];

    let courses = req.user.courses.map((c) => c.code.toLowerCase());
    const searchResults = await SearchResults.find({ code: courses });
    let availableCourses = searchResults.filter((s) => s.isAvailable === true);
    let availableCourseCodes = availableCourses.map((c) => c.code.toLowerCase());
    let allOutdatedCourses = await CourseModel.find({
        $and: [
            { code: availableCourseCodes },
            { $or: [{ createdAt: { $gt: clientOn } }, { updatedAt: { $gt: clientOn } }] },
        ],
    });

    allOutdatedCourses.map((course) => {
        outdatedOnClient.push(course.code);
    });

    if (!allOutdatedCourses.length > 0) {
        return res.json({ updated: false, subscribedCourses: req.user.courses });
    }
    return res.json({
        updated: true,
        updatedCourses: outdatedOnClient,
        subscribedCourses: req.user.courses,
    });
};
