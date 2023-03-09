import { HydratedDocument } from "mongoose";
import AppError from "../../utils/AppError";
import AdminModel from "./admin.model";
import { IAdmin, IAdminCore } from "./admin.schema";

async function createNewAdmin(data: IAdmin) {
    const newAdmin = await AdminModel.create({ ...data });
    return newAdmin;
}

async function getAdminByEmail(email: string): Promise<IAdmin> {
    const user = await AdminModel.findOne({ email: email });
    if (!user) throw new AppError(403, "Invalid Credentials!");
    return user;
}
async function getAdminByUsername(username: string): Promise<HydratedDocument<IAdmin>> {
    const user = await AdminModel.findOne({ name: username });
    if (!user) throw new AppError(403, "Invalid username or password!");
    return user;
}
async function saveToken(username: string, token: string) {
    const updated = await AdminModel.updateOne({ name: username }, { token: token }, { new: true });
    return updated;
}

async function deleteToken(username: string) {
    const updated = await AdminModel.updateOne({ name: username }, { token: "" });
    return updated;
}

export default { createNewAdmin, getAdminByEmail, getAdminByUsername, saveToken, deleteToken };
