import mongoose, { Schema } from "mongoose";
import CourseModel from "../course/course.model.js";
import User from "../user/user.model.js";

const classDetails=mongoose.Schema({
    startDateTime:{type:Date},
    endDateTime:{type:Date},
    location:{type:String},
    professor:{type:String}
},{_id:false})


const ScheduleSchema=mongoose.Schema({
    course:{type:Schema.Types.ObjectId,ref:CourseModel},
    classDetails,
    datesCancelled:{type:[Date]},
    classAdded:{type:[classDetails]},
    notificationSubscribed:[{type:Schema.Types.ObjectId,ref:User}],
    day:{
        type:String,
        enum:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    }
})




const Schedule=mongoose.model('Schedule',ScheduleSchema);
export default Schedule;
