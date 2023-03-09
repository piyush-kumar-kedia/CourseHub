import config from "../../config/default.js";
import jwt from "jsonwebtoken";

const adminJwtSecret = config.adminJwtSecret;

export async function signAdminJWT(_id) {
    const signed = jwt.sign(_id, adminJwtSecret);
    return signed;
}

export async function verifyAdminJWT(token) {
    try {
        const decoded = jwt.verify(token, adminJwtSecret);
        return decoded;
    } catch (error) {
        return false;
    }
}
