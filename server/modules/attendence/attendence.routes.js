import {Router} from "express";
import catchAsync from "../../utils/catchAsync.js";
import Attendence from "./attendence.model.js";
import User from "../user/user.model.js";
const router=Router();
router.get('/',
    async(req,res,next)=>{
        const {token}=req.cookies;
        const getUser=User.findByJWT(token);
        if(!getUser) return next(new AppError(403, "User not found"));
        try{
            const attendence=await Attendence.find({user:getUser._id});
            return res.json(attendence);
        }catch(e){
            
        }
})

router.post('/',async(req,res,next)=>{
    const {token}=req.cookies;
    const getUser=User.findByJWT(token);
    if(!getUser) return next(new AppError(403, "User not found"));
    try{
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
    }catch(e){

    }
})

export default router;