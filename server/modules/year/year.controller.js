import { FolderModel } from "../course/course.model.js";
import CourseModel from "../course/course.model.js";

async function addYear(req, res) {
    const { name, course} = req.body;
    const newYear = await FolderModel.create({
        name,
        course,
        children: [],
        childType:"Folder"
    });

    if (course) {
        const parent = await CourseModel.findOne({code:course});
        parent.children.push(newYear._id);
        await parent.save();
    }

    return res.json(newYear);
}

export {addYear}