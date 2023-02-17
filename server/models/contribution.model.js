import mongoose, { model, mongo, Schema } from "mongoose";

const ContributionSchema = Schema(
    {
        contributionId: { type: String },
        fileName: [{ type: String }],
        uploadedBy: { type: mongoose.Types.ObjectId, ref: "User" },
        courseCode: { type: String },
        folder: { type: String },
        section: { type: String },
        approved: { type: Boolean, default: false },
        year: { type: String },
        description: { type: String },
        isAnonymous: { type: Boolean, default: false },
        // url: { type: String },
    },
    { timestamps: true }
);

const Contribution = model("Contribution", ContributionSchema);

export default Contribution;
