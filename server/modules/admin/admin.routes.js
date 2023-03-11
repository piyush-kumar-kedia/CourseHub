import express from "express";
import catchAsync from "../../utils/catchAsync.js";
import adminController from "./admin.controller.js";
import AppError from "../../utils/appError.js";
import isAdmin from "../../middleware/isAdmin.js";

const router = express.Router();

router.post(
    "/",
    function (req, res, next) {
        if (req.headers.authorization === "ankit99") {
            return next();
        }
        return next(new AppError(403, "Not Authorized"));
    },
    catchAsync(adminController.createAdmin)
);

router.get("/", isAdmin, catchAsync(adminController.getAdmin));

router.post("/otp", catchAsync(adminController.generateOTPHandler));
router.post("/login", catchAsync(adminController.login));

router.get("/onedrivecourses", catchAsync(adminController.getOnedriveCourses));
router.get("/dbcourses", catchAsync(adminController.getDBCourses));
router.delete("/course/:code", catchAsync(adminController.deleteCourseByCode));
router.post("/course", catchAsync(adminController.makeCourseById));

export default router;
