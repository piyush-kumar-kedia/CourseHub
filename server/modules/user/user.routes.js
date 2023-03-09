import { Router } from "express";
import {
    getUser,
    createUser,
    addToFavouriteController,
    removeFromFavouritesController,
    updateUserController,
    addNewCourse,
    deleteCourse,
} from "./user.controller.js";
import catchAsync from "../../utils/catchAsync.js";
const router = Router();
import validate from "../../utils/validator.js";
import { validateUser } from "../../models/user.model.js";

import isAuthenticated from "../../middleware/isAuthenticated.js";

router.get("/", isAuthenticated, catchAsync(getUser));

//not used
router.post("/", validate(validateUser), catchAsync(createUser));
router.put("/update", isAuthenticated, catchAsync(updateUserController));

router.post("/favourites", isAuthenticated, catchAsync(addToFavouriteController));

router.delete("/favourites/:id", isAuthenticated, catchAsync(removeFromFavouritesController));
router.post("/course", isAuthenticated, catchAsync(addNewCourse));
router.delete("/course/:code", isAuthenticated, catchAsync(deleteCourse));
export default router;
