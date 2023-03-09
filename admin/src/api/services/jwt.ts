import AppError from "../utils/AppError";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET || null;

export function generateJWT(id: string): string {
    if (!secret) throw new AppError(500, "Internal server error. Please try again.");
    const token = jwt.sign(
        {
            data: id,
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        secret
    );
    return token;
}

export function verifyJWT(token: string) {
    if (!token) return false;
    if (!secret) return false;
    try {
        let decoded = jwt.verify(token, secret);
        return <any>decoded;
    } catch (error) {
        return false;
    }
}
