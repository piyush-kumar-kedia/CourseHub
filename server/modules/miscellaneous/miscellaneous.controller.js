import FunFacts from "./miscellaneous.model.js";
import express from  'express'
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


async function GetFunFacts(_,res){

    if(await FunFacts.findOne()==null){
        let data = await FunFacts.create({
            funFacts:['CourseHub is Awesome!']
        });
    }

    const {funFacts} = await FunFacts.findOne();
    return res.json({
        data: funFacts
    })
}


async function GetPrivacyPolicy(req,res){
    res.sendFile("./privacy-policy/privacy-policy.html", { root: __dirname });
}



export default {GetFunFacts,GetPrivacyPolicy,ServeFavicon};