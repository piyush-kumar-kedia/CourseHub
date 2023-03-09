import AppError from "../../utils/AppError";
import adminService from "../admin/admin.service";
import bcrypt from "bcrypt";
import AuthModel from "./auth.model";
import { IAuth } from "./auth.schema";
import sendEmail from "../../services/email";

function alertAdmin(email: string) {
    // TODO : send an email alerting the admin
}

async function getOTPFromDB(username: string): Promise<IAuth> {
    const otp = await AuthModel.findOne({ username });
    if (!otp) throw new AppError(403, "Invalid OTP");
    return otp;
}

async function deleteOTPFromDB(username: string) {
    await AuthModel.deleteOne({ username });
}

async function createNewOTP(username: string, email: string) {
    await AuthModel.deleteMany({ username: username });
    const otp = Math.floor(100000 + Math.random() * 900000);
    await AuthModel.create({
        username: username,
        email: email,
        otp: otp,
    });
    // sendEmail(email, otp);
}

async function authenticateAndGenerateOTP(username: string, candidatePassword: string) {
    const user = await adminService.getAdminByUsername(username);
    if (!user) throw new AppError(403, "Invalid username or password!");
    const match = await bcrypt.compare(candidatePassword, user.password);
    if (!match) throw new AppError(403, "Invalid username or password!");
    await createNewOTP(username, user.email);
    return;
}

async function verifyOTP(username: string, otp: number): Promise<boolean> {
    const otpFromDB = await getOTPFromDB(username);
    if (!otpFromDB) throw new AppError(403, "Invalid OTP");
    if (otpFromDB.otp !== otp) {
        alertAdmin(otpFromDB.email);
        await deleteOTPFromDB(username);
        return false;
    }
    await deleteOTPFromDB(username);
    return true;
}

export default { authenticateAndGenerateOTP, verifyOTP };
