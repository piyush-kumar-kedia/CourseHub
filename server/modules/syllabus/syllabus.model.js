import mongoose from 'mongoose';
const SyllabusSchema=new mongoose.Schema({
    code : {type:String},
    courseName : {type:String},
    syllabus:{type:String},
    year:{type:String}
})

const Syllabus=mongoose.model("Syllabus",SyllabusSchema);
export default Syllabus;