import mongoose from "mongoose";

async function connectDB(connectionUri: string | undefined) {
    try {
        if (connectionUri) {
            mongoose.set("strictQuery", false);
            await mongoose.connect(connectionUri);
            console.log("Database connected.");
        } else {
            console.log("DB Connection error");
            process.exit(1);
        }
    } catch (error) {
        // console.log(error);
        console.log("DB Connection error");
        process.exit(1);
    }
}
export default connectDB;
