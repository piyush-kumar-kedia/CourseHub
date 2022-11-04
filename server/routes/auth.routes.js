import express, { json } from "express";
const router = express.Router();
const scope = "User.read offline_acess Mail.read";
import catchAsync from "../utils/catchAsync.js";
import {
	redirectHandler,
	loginHandler,
	logoutHandler,
} from "../controllers/auth.controller.js";

//not used
router.get("/login", loginHandler);

router.get("/login/redirect/", catchAsync(redirectHandler));

router.get("/logout", logoutHandler);

export default router;
