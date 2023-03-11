import mongoose from "mongoose";
import joi from "joi";

// export const otpValidationSchema = joi.object({
//     username: joi.string().required(),
//     otp: joi.number().required(),
// });

const otpSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    otp: { type: Number, required: true },
});

const OTP = mongoose.model("otp", otpSchema);
export default OTP;
