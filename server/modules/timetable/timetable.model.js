import mongoose from "mongoose";
const TimeTableSchema = new mongoose.Schema(
    {
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
    },
    {
        toJSON: {
            transform: function (doc, ret) {
                if (ret?.date) ret.found = true;
                delete ret.__v;
            },
        },
    }
);

const TimeTable = mongoose.model("TimeTable", TimeTableSchema);
export default TimeTable;
