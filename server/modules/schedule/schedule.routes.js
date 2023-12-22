import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import Schedule from "./schedule.model.js";
const router=Router();
router.get('/:day',
catchAsync(async(req,res,next)=>{
    const day=req.params.day;
    if(day){
        const schedule=await Schedule.findOne({day});
        if(schedule){
            res.json(schedule);
        }else res.json({message:"No schedule found"});
    }
    
})
)

router.post('/',catchAsync(async(req,res,next)=>{
        const {courseName,startTime,endTime,classLocation,branch,semester,day}=req.body;
        const schedule=new Schedule({
            courseName,
            startTime,
            endTime,
            classLocation,
            branch,
            semester,
            day
        })
        await schedule.save();
        res.json(schedule);
}))

export default router;