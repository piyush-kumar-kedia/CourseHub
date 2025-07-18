import { FolderModel } from "../course/course.model.js";
import CourseModel from "../course/course.model.js";
import { deleteFile } from "../file/file.controller.js";

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

async function deleteYear(req, res) {
    const { folder, courseCode } = req.body;
    const folderId = folder._id;

    try {
        if (courseCode) {
            await CourseModel.findOneAndUpdate(
                {code: courseCode}, 
                {$pull: { children: folderId }}
            );
        }
        // const deleted = await FolderModel.findByIdAndDelete(folderId);
        // if (!deleted) {
        //     return res.status(404).json({ message: "Folder not found" });
        // }
        recursiveDelete(folder);

        return res.json({ success: true, folderId });
    } catch (err) {
        console.error("Error deleting year:", err);
        return res.status(500).json({ success: false, error: err.message });
    }
}

async function recursiveDelete(folder){
    if(!folder.children) {
        await FolderModel.findByIdAndDelete(folder._id);
        return;
    }
    if (folder.childType === "Folder"){
        for(const subfolder of folder.children){
            await recursiveDelete(subfolder);
        }
        await FolderModel.findByIdAndDelete(folder._id);
    }
    else if(folder.childType === "File"){
        for(const file of folder.children){
            console.log(file);
            await deleteFile(file);
        }
        await FolderModel.findByIdAndDelete(folder._id);
    }
}

export {addYear,deleteYear}