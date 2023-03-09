import mongoose, { Schema, model } from "mongoose";
import { IAdmin } from "./admin.schema";
import bcrypt from "bcrypt";

const AdminSchema = new Schema<IAdmin>({
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true },
});

AdminSchema.pre("save", async function (next) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;

    return next();
});

const AdminModel = model<IAdmin>("Admin", AdminSchema);

export default AdminModel;
