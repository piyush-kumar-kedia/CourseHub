import mongoose from "mongoose";
const TimeTableSchema = new mongoose.Schema({
    code: { type: String },
    room: { type: String },
    date: { type: String },
    time: { type: String },
    nStudents: { type: Number },
    from: { type: Number },
    to: { type: Number },
    all: { type: Boolean, default: false },
    individual: { type: Number },
    backloggers: { type: Boolean, default: false },
});

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);
export default TimeTable;
