import mongoose from "mongoose";


const FunFactsSchema = new mongoose.Schema({
    funFacts:{
        type:[String],
       required:true
    }
})

const FunFacts = mongoose.model("FunFacts",FunFactsSchema);

export default FunFacts;