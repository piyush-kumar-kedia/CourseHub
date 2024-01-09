import { schedule } from "node-cron";
import Attendence from "./attendence.model.js";

class attendenceController{
    async getAttendence(req,res,next){
        const getUser=req.user;
        if(!getUser) res.sendStatus(400);
        const attendence=await Attendence.find({user:getUser._id}).select('-_id -user  -__v').populate({
            path: 'schedule',
            populate: {
              path: 'course',
              select:'code name -_id',
              model: 'Course',
            },
            select:'course -_id'
          });;
        return res.status(200).json(attendence);
    }

    async postAttendence(req,res,next){
        const getUser=req.user;
        const data=req.body;

        if(!data.schedule || !data.classAttended || !data.totalClass || !data.percentageCompulsory) return res.sendStatus(400);
            const attendence=new Attendence({
                user:getUser._id,
                schedule:data.schedule,
                classAttended:data.classAttended,
                totalClass:data.totalClass,
                percentageCompulsory:data.percentageCompulsory,
            })
        await attendence.save();
        res.status(200).json(attendence);
    }

    async updateAttendence(req,res,next){
        const getUser=req.user;

        const {schedule}=req.body;

        const existingAttendence=await Attendence.findOne({user:getUser._id,schedule});

        if(!existingAttendence) res.sendStatus(400);

        const updateObj={};

        for(let key in req.body){
            updateObj[key]=req.body[key];
        }

        const updatedAttendence=await existingAttendence.updateOne({$set:updateObj},{new:true});

        res.status(200).json(updatedAttendence);
    }
}

export default new attendenceController();