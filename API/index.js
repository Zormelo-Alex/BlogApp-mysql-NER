import express from "express";
import auth from "./routes/auth.js"
import users from "./routes/users.js"
import posts from "./routes/posts.js"
const app = express();
import cookieParser from "cookie-parser";
import { db } from "./db.js";

db.connect((err)=>{
    if(err){
        console.log(err)
        return;
    }
    console.log("connected")
})

// db.query(`SELECT * FROM blog.users`, (err, data)=>{
//     return console.log(data)
// })


app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", auth)
app.use("/api/users",users)
app.use("/api/post", posts)

app.get("/", (req, res)=>{
    res.json("it works!")
})

app.listen(5000, ()=>{
    console.log("port open at 5000")
})