import express from "express";
import {addYear} from "./year.controller.js";
import isAuthenticated from "../../middleware/isAuthenticated.js";
import  {isBR}  from "../../middleware/isBR.js";

const router = express.Router();

router.post("", isAuthenticated, isBR, addYear);

export default router;
