import { Router } from "express";
import catchAsync from "../../utils/catchAsync.js";
import Syllabus from "./syllabus.model.js";
const router=Router();
router.get('/:code',
catchAsync(async(req,res,next)=>{
    let code=req.params.code;
    let data= await Syllabus.find({code:code.toUpperCase()}).select("-__v -_id");
    return res.json(data);
})
)

export default router;