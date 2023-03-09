import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import configRoutes from "./route";
import configMiddleware from "./middleware";
import connectDB from "./db";

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;

const app: Express = express();
app.use(express.json());
connectDB(MONGO_URI);
configMiddleware(app);
configRoutes(app);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    const { status = 500, message = "Something went wrong." } = err;
    console.log({ error: true, message: message });
    return res.status(status).json({ error: true, message: message });
});

app.listen(PORT, function () {
    console.log("Listening on PORT", PORT);
});
