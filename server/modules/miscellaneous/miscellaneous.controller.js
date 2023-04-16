import FunFacts from "./miscellaneous.model.js";

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

export default {GetFunFacts};