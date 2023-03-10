import AppError from "../../utils/appError.js";
import {
    signAdminJWT,
    tryAuthenticate,
    verifyOTP,
    generateOTP,
} from "../auth-admin/auth-admin.services.js";
import Admin, {
    adminValidationSchema,
    generateCodeValidaitionSchema,
    loginValidationSchema,
} from "./admin.model.js";

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

async function generateOTPHandler(req, res, next) {
    const { body } = req;
    try {
        await generateCodeValidaitionSchema.validateAsync(body);
    } catch (error) {
        return next(new AppError(400, error.details));
    }
    const user = await Admin.findOne({ username: body.username });
    if (!user) return next(new AppError(403, "Invalid Username or Password!"));
    const match = await tryAuthenticate(body.password, user.password);
    if (!match) return next(new AppError(403, "Invalid Username or Password!"));
    await generateOTP(user.username, user.email);
    return res.json({
        otpGenerated: true,
    });
}

async function login(req, res, next) {
    const { body } = req;
    try {
        await loginValidationSchema.validateAsync(body);
    } catch (error) {
        return next(new AppError(400, error.details));
    }
    const user = await Admin.findOne({ username: body.username });
    if (!user) return next(new AppError(403, "Invalid OTP!"));
    const match = await verifyOTP(user.email, body.otp);
    if (!match) return next(new AppError(403, "Invalid OTP!"));
    const token = await signAdminJWT(user._id.toString());
    return res.json({
        loginSuccessful: true,
        token: token,
    });
}

export default { createAdmin, getAdmin, generateOTPHandler, login };
