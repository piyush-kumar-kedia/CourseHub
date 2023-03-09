import { Request, Response, NextFunction } from "express";
import { AuthenticatedRequest, IGenerateCodeRequest, ILoginRequest } from "./auth.schema";
import authService from "./auth.service";
import AppError from "../../utils/AppError";
import { generateJWT } from "../../services/jwt";
import adminService from "../admin/admin.service";

async function generateOTP(
    req: Request<{}, {}, IGenerateCodeRequest>,
    res: Response,
    next: NextFunction
) {
    await authService.authenticateAndGenerateOTP(req.body.name, req.body.password);
    return res.json({
        otpGenerated: true,
    });
}

async function login(req: Request<{}, {}, ILoginRequest>, res: Response, next: NextFunction) {
    const match = await authService.verifyOTP(req.body.name, req.body.otp);
    if (!match) {
        return next(new AppError(403, "Invalid OTP"));
    }
    const user = await adminService.getAdminByUsername(req.body.name);
    if (!user) return next(new AppError(500, "Internal server error"));
    const token = generateJWT(user.name);
    await adminService.saveToken(user.name, token);
    return res.json({ loggedIn: true, accessToken: token });
}

async function logout(req: Request, res: Response, next: NextFunction) {
    const user = req.user;
    await adminService.deleteToken(user.name);
    return res.json({ loggedOut: true });
}

export default { generateOTP, login, logout };
