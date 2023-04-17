import {Router} from 'express'
import catchAsync from "../../utils/catchAsync.js";
import miscellaneousController from './miscellaneous.controller.js';

const router = Router();

router.get('/fun-facts',catchAsync(miscellaneousController.GetFunFacts));
router.get("/privacy-policy", catchAsync(miscellaneousController.GetPrivacyPolicy));

export default router;