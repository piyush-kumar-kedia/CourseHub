import { FolderModel } from "../course/course.model.js";

async function createFolder(req, res) {
    const { name, course, parentFolder } = req.body;
    const newFolder = await FolderModel.create({
        name,
        course,
        childType: "Folder",
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
    const { folderId, parentFolderId } = req.query;

    try {
        if (parentFolderId) {
            await FolderModel.findByIdAndUpdate(parentFolderId, {
                $pull: { children: folderId },
            });
        }
        const deleted = await FolderModel.findByIdAndDelete(folderId);
        if (!deleted) {
            return res.status(404).json({ message: "Folder not found" });
        }

        return res.json({ success: true, folderId });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message });
    }
}
export { createFolder,deleteFolder };