import {Router} from "express";
import catchAsync from "../../utils/catchAsync.js";
import attendenceController from "./attendence.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";

const router=Router();

router.get('/',isAuthenticated,catchAsync(attendenceController.getAttendence));
router.post('/',isAuthenticated,catchAsync(attendenceController.postAttendence));
router.post('/updateAttendence',isAuthenticated,catchAsync(attendenceController.updateAttendence));

export default router;