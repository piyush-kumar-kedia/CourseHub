import Contribution from "../models/contribution.model.js";
import Joi from "joi";
import AppError from "../utils/appError.js";
import validatePayload from "../utils/validate.js";
import formidable from "formidable";
import UploadFile from "../services/UploadFile.js";
import fs from "fs";

async function ContributionCreation(contributionId, data) {
    const existingContribution = await Contribution.findOne({ contributionId });
    console.log(existingContribution);
    if (!existingContribution) {
        const newContribution = await Contribution.create({ ...data, contributionId });
        // console.log("new contri");
        return newContribution;
    }
    const updatedContribution = await Contribution.findOneAndUpdate(
        { contributionId },
        { ...data },
        { new: true }
    );
    // console.log("updated contri");
    return updatedContribution;
}

async function HandleFileToDB(contributionId, fileName) {
    const existingContribution = await Contribution.findOne({ contributionId });

    if (!existingContribution) {
        const newContribution = await Contribution.create({ contributionId, fileName });
        console.log("new contri");
        return newContribution;
    }
    existingContribution.fileName.push(fileName);
    await existingContribution.save();
    console.log("updated contri");
    return existingContribution;
}

async function GetAllContributions(req, res, next) {
    const allContributions = await Contribution.find({});
    res.json(allContributions);
}

async function HandleFileUpload(req, res, next) {
    const contributionId = req.headers["contribution-id"];

    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        let initialPath = files.filepond.filepath;
        let newFilename = files.filepond.newFilename;
        let originalFilename = files.filepond.originalFilename;

        const finalPath = initialPath.slice(0, initialPath.indexOf(newFilename));

        fs.rename(finalPath + newFilename, finalPath + originalFilename, async () => {
            await HandleFileToDB(contributionId, originalFilename);
            await UploadFile(contributionId, finalPath, originalFilename);
        });

        return res.json({ fields, files });
    });
}

async function CreateNewContribution(req, res, next) {
    const payloadSchema = {
        contributionId: Joi.string().required(),
        year: Joi.string().required(),
        uploadedBy: Joi.string().required(),
        courseCode: Joi.string().required(),
        folder: Joi.string().required(),
        description: Joi.string().required(),
        // isAnonymous: Joi.boolean().required(),
    };
    const data = req.body;
    const valid = validatePayload(payloadSchema, data);
    if (valid.error) {
        return next(new AppError(400, valid.error));
    }
    let _data = JSON.parse(JSON.stringify(data));
    delete _data.contributionId;
    // console.log(data, _data);
    const newContribution = await ContributionCreation(data.contributionId, _data);
    return res.json({
        created: true,
        // data: newContribution,
    });
}

export default { GetAllContributions, CreateNewContribution, HandleFileUpload };
