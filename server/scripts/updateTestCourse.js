import mongoose from "mongoose";
import CourseModel from "../modules/course/course.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const makeNewCourse = async () => {
    await CourseModel.findOneAndUpdate(
        {
            name: "Test",
        },
        {
            name: "testupdated",
        }
    );
};

await makeNewCourse();
console.log("UPDATED NEW COURSE");

process.exit(0);
