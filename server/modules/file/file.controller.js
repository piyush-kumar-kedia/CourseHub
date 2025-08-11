import { FileModel, FolderModel } from "../course/course.model.js";
import { DeleteFile } from "../../services/UploadFile.js";

// Verify file
export const verifyFile = async (req, res) => {
    try {
        const file = await FileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });

        file.isVerified = true;
        await file.save();

        res.status(200).json({ message: "File verified successfully", file });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Unverify file (delete it)
export const unverifyFile = async (req, res) => {
    try {
        //Delete file object from DB
        const folderId = req.body.folderId;
        await FolderModel.findByIdAndUpdate(folderId, {$pull: {children: req.params.id}});
        const file = await FileModel.findByIdAndDelete(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });

        //Delete file object from Onedrive
        await DeleteFile(req.body.oneDriveId);

        res.status(200).json({ message: "File deleted (unverified) successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

//Delete File function for folders
export const deleteFile = async (file) => {
    console.log(file.fileId);
    await FileModel.findByIdAndDelete(file._id);
    await DeleteFile(file.fileId);
}

export const getAllFiles = async (req, res) => {
    try {
        console.log(req.user);
        let files;

        if (req.user.isBR === true) {
            // BR gets everything
            files = await FileModel.find().sort({ uploadedAt: -1 });
        } else {
            // Regular users get only verified files
            files = await FileModel.find({ isVerified: true }).sort({ uploadedAt: -1 });
        }

        res.status(200).json(files);
    } catch (err) {
        console.log(req.user);
        console.error("Error fetching files:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};


export const getFileLink = async (req, res) => {
    try {
        const fileId = req.params.id;
        console.log(fileId);
        const file = await FileModel.find({_id: fileId}).populate('webUrl');
        
        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        // Fixed: Return the webUrl properly
        return res.status(200).json({file });
        
    } catch (error) {
        // Added error handling
        console.error('Error fetching file link:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
};