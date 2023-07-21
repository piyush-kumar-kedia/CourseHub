import mongoose from "mongoose";

const FunFactsSchema = new mongoose.Schema({
    funFacts: {
        type: [String],
        required: true,
    },
});

const FeedbackBugSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["BUG", "FEEDBACK"],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String,
        required: true,
    },
    screenshots: {
        type: [String],
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
});

const UserUpdateSchema = new mongoose.Schema({
    rollNumber: {
        type: Number,
    }
})

const FunFacts = mongoose.model("FunFacts", FunFactsSchema);
const FeedbackBug = mongoose.model("FeedbackBug", FeedbackBugSchema);
const UserUpdate = mongoose.model("UserUpdate", UserUpdateSchema);

export { FunFacts, FeedbackBug, UserUpdate };
