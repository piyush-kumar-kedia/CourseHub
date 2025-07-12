import { FileModel } from "../course/course.model.js";

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
        const file = await FileModel.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });

        await file.deleteOne();
        res.status(200).json({ message: "File deleted (unverified) successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

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
