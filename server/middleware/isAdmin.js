import Admin from "../modules/admin/admin.model.js";
import { verifyAdminJWT } from "../modules/auth-admin/auth-admin.services.js";
import AppError from "../utils/appError.js";

async function isAdmin(req, res, next) {
    try {
        const tokenFromCookie = req.cookies?.adminToken;
        const tokenFromHeader = req.headers?.authorization?.startsWith("Bearer ")
            ? req.headers.authorization.split(" ")[1]
            : null;
        const token = tokenFromCookie || tokenFromHeader;
        if (!token) return next(new AppError(403, "Not Authorized!"));

        const decoded = await verifyAdminJWT(token);
        if (!decoded) return next(new AppError(403, "Not Authorized!"));

        const admin = await Admin.findById(decoded);
        if (!admin) return next(new AppError(403, "Not Authorized!"));

        req.admin = admin;
        return next();
    } catch (err) {
        return next(new AppError(403, "Not Authorized!"));
    }
}

export default isAdmin;
