import mongoose from "mongoose";
const EventSchema = new mongoose.Schema({
    firstYearDates: {
        midSem: { type: Date },
        endSem: { type: Date },
    },
    otherDates: {
        midSem: { type: Date },
        endSem: { type: Date },
    },
});
const Event = mongoose.model("Event", EventSchema);
export default Event;

const mobileUpdateSchema = new mongoose.Schema({
    version: { type: Number, required: true },
    platform: { type: String, enum: ["android", "ios"], required: true },
    changeLog: { type: [String] },
});

export const mobileUpdateModel = mongoose.model("MobileUpdate", mobileUpdateSchema);
