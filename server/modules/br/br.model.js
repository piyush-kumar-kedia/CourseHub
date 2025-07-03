import { model, Schema } from "mongoose";
const BRSchema = Schema({
    email: { type: String, required: true, unique: true },
});

const BR = model("BR", BRSchema);
export default BR;
