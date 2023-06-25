import express from "express";
import auth from "./routes/auth.js"
import users from "./routes/users.js"
import posts from "./routes/posts.js"
const app = express();
import cookieParser from "cookie-parser";
import multer from "multer";
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
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client-s/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      //name of file
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    res.status(200).send(file.filename)
  })
app.use("/api/auth", auth)
app.use("/api/users",users)
app.use("/api/posts", posts)

app.get("/", (req, res)=>{
    res.json("it works!")
})

app.listen(5000, ()=>{
    console.log("port open at 5000")
})