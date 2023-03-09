import AppError from "../../utils/appError.js";
import Admin, { adminValidationSchema } from "./admin.model.js";

async function createAdmin(req, res, next) {
    const { body } = req;
    try {
        await adminValidationSchema.validateAsync(body);
    } catch (error) {
        return next(new AppError(400, error.details));
    }

    const newAdmin = await Admin.create(body);

    return res.json(newAdmin);
}

async function getAdmin(req, res, next) {
    const token = req.user;
    const admin = await Admin.findById(token);
    if (!admin) return next(new AppError(500, "Something went wrong!"));
    return res.json({
        user: {
            username: admin.username,
            email: admin.email,
        },
    });
}

export default { createAdmin, getAdmin };
