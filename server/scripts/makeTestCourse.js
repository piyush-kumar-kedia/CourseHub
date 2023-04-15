import mongoose from "mongoose";
import CourseModel from "../modules/course/course.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const makeNewCourse = async () => {
    await CourseModel.create({
        name: "Test",
        code: "TEST102",
    });
};

await makeNewCourse();
console.log("MADE NEW COURSE");

process.exit(0);
