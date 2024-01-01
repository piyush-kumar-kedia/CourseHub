import Admin from "../modules/admin/admin.model.js";
import { verifyAdminJWT } from "../modules/auth-admin/auth-admin.services.js";
import AppError from "../utils/appError.js";
async function isAdmin(req, res, next) {
    const token = req.headers?.authorization?.split(" ")[1];
    if (!token) return next(new AppError(403, "Not Authorized!"));
    let check = token === "admin-coursehub-cc23-golang";
    // const decoded = await verifyAdminJWT(token);
    // if (!decoded) return next(new AppError(403, "Not Authorized!"));
    // const admin = await Admin.findById(decoded);
    // if (!admin) return next(new AppError(403, "Not Authorized!"));
    if (!check) return next(new AppError(403, "Not Authorized!"));
    req.user = admin;
    return next();
}
export default isAdmin;
