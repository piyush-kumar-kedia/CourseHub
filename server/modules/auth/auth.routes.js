import express, { json } from "express";
const router = express.Router();
const scope = "User.read offline_acess Mail.read";
import catchAsync from "../../utils/catchAsync.js";
import {
    redirectHandler,
    mobileRedirectHandler,
    loginHandler,
    logoutHandler,
    guestLoginHanlder,
    fetchCourses,
    fetchCoursesForBr
} from "./auth.controller.js";

//not used
router.get("/login", loginHandler);
//router.get("/loading", LoadingPage);
// router.get("/make/guest", makeGuestHanlder);
router.get("/login/guest", guestLoginHanlder);
router.post("/fetchCourses", async (req, res, next) => {
    try {
        const { rollNumber } = req.body;
        if (!rollNumber) return res.status(400).json({ error: "rollNumber required" });
        const courses = await fetchCourses(rollNumber);
        res.json({ courses });
    } catch (err) {
        next(err);
    }
});

router.post("/fetchCoursesForBr", async (req, res, next) => {
    try {
        const { rollNumber } = req.body;
        if (!rollNumber) return res.status(400).json({ error: "rollNumber required" });
        const courses = await fetchCoursesForBr(rollNumber);
        res.json({ courses });
    } catch (error) {
        next(error);
    }
});
router.get("/login/redirect", catchAsync(redirectHandler));
router.get("/login/redirect/mobile", catchAsync(mobileRedirectHandler));

router.get("/logout", logoutHandler);

export default router;
