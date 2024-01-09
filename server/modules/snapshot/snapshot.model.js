import mongoose from "mongoose";
const UserSnapshotSchema = new mongoose.Schema({
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
});

const UserSnapshot = mongoose.model("user-snapshot", UserSnapshotSchema);
export default UserSnapshot;
