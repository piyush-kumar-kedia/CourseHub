import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    semester: { type: Number },
    midSem: { type: Date },
    endSem: { type: Date },
});

const Event = mongoose.model("Event", EventSchema);
export default Event;
