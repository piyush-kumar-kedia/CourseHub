import mongoose, { model, mongo, Schema } from "mongoose";
import User from "../user/user.model.js";
const ContributionSchema = Schema(
    {
        contributionId: { type: String },
        //fileName: [{ type: String }],
        uploadedBy: { type: String },
        //uploadedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        courseCode: { type: String },
        //folder: { type: String },
        //section: { type: String },
        parentFolder: { type: Schema.Types.ObjectId, ref: "Folder" },
        files: [{ type: Schema.Types.ObjectId, ref: "File" }],
        approved: { type: Boolean, default: false },
        //year: { type: String },
        description: { type: String },
        // isAnonymous: { type: Boolean, default: false },
        // url: { type: String },
    },
    { timestamps: true }
);
//pre save
ContributionSchema.pre("save", async function (next) {
    try {
        if (this.uploadedBy) {
            const user = await User.findById(this.uploadedBy);
            if (user && user.isBR) {
                this.approved = true;
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Contribution = model("Contribution", ContributionSchema);

export default Contribution;
