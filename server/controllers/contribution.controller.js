import Contribution from "../models/contribution.model.js";
import Joi from "joi";
import AppError from "../utils/appError.js";
import validatePayload from "../utils/validate.js";

async function GetAllContributions(req, res, next) {
    const allContributions = await Contribution.find({});
    res.json(allContributions);
}

async function CreateNewContribution(req, res, next) {
    const payloadSchema = {
        fileName: Joi.string().required(),
        uploadedBy: Joi.string().required(),
        course: Joi.string().required(),
        folder: Joi.string().required(),
        approved: Joi.boolean().required(),
        // url: Joi.string().required(),
        fileData: Joi.string().required(),
    };
    const data = req.body;
    const valid = validatePayload(payloadSchema, data);
    if (valid.error) {
        return next(new AppError(400, valid.error));
    }

    const newContribution = await Contribution.create(data);
    return res.json({ created: true, data: newContribution });
}

export default { GetAllContributions, CreateNewContribution };
