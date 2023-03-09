import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import { verifyJWT } from "../services/jwt";
import adminService from "../modules/admin/admin.service";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (!token) return next(new AppError(403, "Not authorized!"));

    const decoded: { data: string } = verifyJWT(token);
    if (!decoded) return next(new AppError(403, "Not authorized!"));
    let user;
    try {
        user = await adminService.getAdminByUsername(<any>decoded.data.toString());
    } catch (error) {
        return next(new AppError(403, "Not authorized!"));
    }

    req.user = user;
    return next();
}

export default isAdmin;
