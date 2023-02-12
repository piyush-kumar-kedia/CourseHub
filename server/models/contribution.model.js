import { model, Schema } from "mongoose";

const ContributionSchema = Schema({
    fileName: { type: String },
    uploadedBy: { type: String },
    course: { type: String },
    folder: { type: String },
    approved: { type: Boolean, default: false },
    url: { type: String },
});

const Contribution = model("Contribution", ContributionSchema);

export default Contribution;
