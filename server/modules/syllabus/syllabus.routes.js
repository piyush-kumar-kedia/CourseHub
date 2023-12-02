import { Router } from "express";
import { uploadSyllabus } from "./syllabus.controller.js";

const router=Router();
router.get('/upload',(req,res)=>{
    uploadSyllabus();
    res.json({message : "uploaded"});
})

export default router;