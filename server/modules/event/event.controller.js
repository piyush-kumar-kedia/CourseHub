import EventModel, { mobileUpdateModel } from "./event.model.js";
import AppError from "../../utils/appError.js";

async function GetExamDates(req, res, next) {
    const semester = req.user.semester;
    const examDates = await EventModel.findOne();
    if (!examDates) return next(new AppError(404, "Data not available"));
    if (semester === 1) return res.json({ dates: examDates.firstYearDates });
    return res.json({ dates: examDates.otherDates });
}

async function GetLatestMobileVersion(req, res, next) {
    const { platform } = req.params;
    const updateDetails = await mobileUpdateModel.findOne({ platform: platform });
    return res.json({ details: updateDetails });
}

export default { GetExamDates, GetLatestMobileVersion };
