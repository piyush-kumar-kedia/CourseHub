import mongoose, { Schema } from "mongoose";
import User from "../user/user.model.js";
import Schedule from "../schedule/schedule.model.js";

const AttendenceSchema=new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:User},
    schedule:{type:Schema.Types.ObjectId,ref:Schedule},
    classAttended:{type:Number},
    totalClass:{type:Number},
    percentageCompulsory:{type:Number,default:75}
})

const Attendence=mongoose.model('Attendence',AttendenceSchema);
export default Attendence;