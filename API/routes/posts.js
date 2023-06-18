import express from "express";
import {addPost, deletePost, getPost, getPosts, updataPost} from "../controllers/posts.js"
const router = express.Router();


router.get("/", getPosts)
router.get("/:id", getPost)
router.post("/", addPost)
router.delete("/:id", deletePost)
router.update("/:id", updataPost)


export default router;


