import { model, Schema } from "mongoose";
import Joi from "joi";

const userSchema = Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	rollNumber: { type: Number, required: true, unique: true },
	branch: { type: String, required: true },
	semester: { type: Number, reqiured: true },
	degree: { type: String, required: true },
});

const User = model("User", userSchema);
export default User;

export const validateUser = function (obj) {
	const joiSchema = Joi.object({
		name: Joi.string().min(4).required(),
		email: Joi.string().email().required(),
		rollNumber: Joi.number().required(),
		branch: Joi.string().required(),
		semester: Joi.number().required(),
		degree: Joi.string().required(),
	});
	return joiSchema.validate(obj);
};
