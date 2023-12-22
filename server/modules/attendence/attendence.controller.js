import Attendence from "./attendence.model.js";

class attendenceController{
    async getAttendence(req,res,next){
        const getUser=req.user;
        const attendence=await Attendence.find({user:getUser._id});
        return res.json(attendence);
    }

    async postAttendence(req,res,next){
        const getUser=req.user;
        const {courseCode,course,classAttended,totalClass,percentageCompulsory}=req.body;
            const attendence=new Attendence({
                user:getUser._id,
                course,
                courseCode,
                classAttended,
                totalClass,
                percentageCompulsory,
            })
        await attendence.save();
        res.json(attendence);
    }
}

export default new attendenceController();