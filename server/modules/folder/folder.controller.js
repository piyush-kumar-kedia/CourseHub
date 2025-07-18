import { FolderModel } from "../course/course.model.js";
import { deleteFile } from "../file/file.controller.js";

async function createFolder(req, res) {
    const { name, course, parentFolder, childType } = req.body;
    console.log(req.body);
    const newFolder = await FolderModel.create({
        name,
        course,
        childType,
        children: [],
    });

    if (parentFolder) {
        const parent = await FolderModel.findById(parentFolder);
        parent.children.push(newFolder._id);
        await parent.save();
    }

    return res.json(newFolder);
}
async function deleteFolder(req, res) {
    const { folder, parentFolderId } = req.body;
    const folderId = folder._id;

    try {
        if (parentFolderId) {
            await FolderModel.findByIdAndUpdate(parentFolderId, {
                $pull: { children: folderId },
            });
        }
        // const deleted = await FolderModel.findByIdAndDelete(folderId);
        // if (!deleted) {
        //     return res.status(404).json({ message: "Folder not found" });
        // }
        recursiveDelete(folder);

        return res.json({ success: true, folderId });
    } catch (err) {
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

export { createFolder, deleteFolder };
