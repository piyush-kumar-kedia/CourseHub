import mongoose from "mongoose";
import { IAuth } from "./auth.schema";

const AuthSchema = new mongoose.Schema<IAuth>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: Number, required: true },
});

const AuthModel = mongoose.model<IAuth>("Auth", AuthSchema);
export default AuthModel;
