import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import scheduleController from "./schedule.controller.js";

const router=Router();

router.get('/:day',catchAsync(scheduleController.getSchedule))
router.post('/',catchAsync(scheduleController.postSchedule))

export default router;