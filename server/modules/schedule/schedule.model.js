import mongoose from "mongoose";

const ScheduleSchema=mongoose.Schema({
    courseName:{type:String},
    startTime:{type:String},
    endTime:{type:String},
    classLocation:{type:String},
    branch:{type:String},
    semester:{type:String},
    day:{
        type:String,
        enum:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
    }
})

const Schedule=mongoose.model('Schedule',ScheduleSchema);
export default Schedule;