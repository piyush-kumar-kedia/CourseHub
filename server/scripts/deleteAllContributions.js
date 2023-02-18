import mongoose from "mongoose";
import Contribution from "../models/contribution.model.js";
import connectDatabase from "../services/connectDB.js";
import "dotenv/config";

connectDatabase();
const deleteAllContributions = async () => {
    await Contribution.deleteMany({});
};

await deleteAllContributions();
console.log("DELETED ALL Contributions");

process.exit(0);
