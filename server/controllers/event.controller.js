import EventModel from "../models/event.model.js";
import AppError from "../utils/appError.js";

async function GetExamDates(req, res, next) {
    const semester = req.user.semester;
    const examDates = await EventModel.findOne({ semester });
    if (!examDates) return next(new AppError(404, "Data not available"));
    return res.json(examDates);
}

export default { GetExamDates };
