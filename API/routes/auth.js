import express from "express";
const router = express.Router();
import { greetings, login, logout, register } from "../controllers/auth.js";

router.get("/", greetings);

router.post("/register", register)

router.post("/login", login)

router.post("/logout", logout)


export default router;