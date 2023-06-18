import express from "express";
const router = express.Router();
import { greetings } from "../controllers/user.js";


router.get("/", greetings)


export default router;