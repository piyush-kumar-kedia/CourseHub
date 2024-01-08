import AppError from "../../utils/appError.js";
import User, { RemoveCourse } from "./user.model.js";
import { addToFavourites, removeFromFavourites, AddNewCourse } from "./user.model.js";
import { updateUserData } from "./user.model.js";
export const getUser = async (req, res, next) => {
    return res.json(req.user);
};

//not used
export const createUser = async (req, res) => {
    const data = req.body;
    const user = new User(data);
    const savedUser = await user.save();
    res.json(savedUser);
};
export const updateUserController = async (req, res) => {
    const data = req.body;
    updateUserData(req.user._id, data);
};
export const addToFavouriteController = async (req, res, next) => {
    const data = req.body;
    if (!data.id || !data.name || !data.path || !data.code) return res.sendStatus(400);
    //validate
    const updatedUser = await addToFavourites(
        req.user._id,
        data.name,
        data.id,
        data.path,
        data.code
    );
    return res.status(200).json(updatedUser);
};
export const addNewCourse = async (req, res, next) => {
    const data = req.body;
    if (!data.code || !data.name) return res.sendStatus(400);

    const updatedUser = await AddNewCourse(req.user._id, data.code, data.name);
    return res.status(200).json(updatedUser);
};
export const deleteCourse = async (req, res, next) => {
    const { code } = req.params;
    if (!code) return res.sendStatus(400);
    const updatedUser = await RemoveCourse(req.user._id, code);

    return res.status(200).json(updatedUser);
};
export const removeFromFavouritesController = async (req, res, next) => {
    const { id } = req.params;
    if (!id) return res.sendStatus(400);
    //validate
    const updatedUser = await removeFromFavourites(req.user._id, id);
    return res.status(200).json(updatedUser);
};
export const updateDeviceToken = async (req, res, next) => {
    const user = req.user;
    const { deviceToken } = req.body;
    if (!deviceToken) return next(new AppError("Invalid device token"));
    await User.findByIdAndUpdate(user._id, { deviceToken: deviceToken });
    return res.json({ status: 200 });
};
