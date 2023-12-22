import mongoose, { Schema } from "mongoose";
import User from "../user/user.model.js";

const AttendenceSchema=new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:User},
    courseCode:{type:String},
    course:{type:String},
    classAttended:{type:Number},
    totalClass:{type:Number},
    percentageCompulsory:{type:Number,default:75}
})

const Attendence=mongoose.model('Attendence',AttendenceSchema);
export default Attendence;