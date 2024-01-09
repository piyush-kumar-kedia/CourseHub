import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import scheduleController from "./schedule.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";

const router=Router();


router.get('/:date',isAuthenticated,catchAsync(scheduleController.getSchedule))
router.post('/',catchAsync(scheduleController.createSchedule))
router.post('/updateSchedule',catchAsync(scheduleController.updateSchedule))
router.post('/datesCancelled',catchAsync(scheduleController.datesCancelled))
router.post('/subscribeNotification',isAuthenticated,catchAsync(scheduleController.subscribeNotification))
router.post('/addClass',catchAsync(scheduleController.addClass))

export default router;