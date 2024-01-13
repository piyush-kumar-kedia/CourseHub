import mongoose from "mongoose";
const UserSnapshotSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        courses: { type: Array, default: [] },
        favourites: [
            {
                name: { type: String },
                id: { type: String },
                path: { type: String },
                code: { type: String },
            },
        ],
    },
    { timestamps: true }
);

const OriginalCourseSnapshotSchema = new mongoose.Schema({
    email: { type: String, required: true },
    courses: { type: Array, default: [] },
});

const UserSnapshot = mongoose.model("user-snapshot", UserSnapshotSchema);
export const OriginalCoursesSnapshot = mongoose.model(
    "originalcourse-snapshot",
    OriginalCourseSnapshotSchema
);
export default UserSnapshot;
