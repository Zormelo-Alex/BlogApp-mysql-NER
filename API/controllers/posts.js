import {db} from "../db.js"
import jwt from "jsonwebtoken"


export const getPosts = (req, res) =>{
    //res.send("welcome Alexander to the post route")
    const query = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";
    //console.log(req.query.cat)
    db.query(query, [req.query.cat], (err, data)=>{
        if(err) return res.status(500).send(err)
        return res.status(200).send(data);
    })
}

export const getPost = (req, res) =>{
    let id = req.params.id;
    //console.log(id)
    const query = "SELECT `username`, `title`, `desc`, `cat`, `date`, `userid`, p.id AS postid, p.img, u.img AS userimg FROM users u JOIN posts p ON u.id = p.userid WHERE p.id = ?"
    db.query(query, [id], (err, data)=>{
        if(err) return res.status(500).send(err);
        //console.log(data);
        res.status(200).send(data[0]);
    })
}

export const addPost = (req, res) =>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send("access denied!, user not authenticated")
    jwt.verify(token, "jwtkey", (err, data)=>{
        if(err) res.status(403).send("invalid token")
        //console.log(data)
        console.log(data)

        const query = "INSERT INTO posts(`title`, `desc`, `img`, `date`, `userid`, `cat`) VALUES (?)"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.date,
            data.id,
            req.body.cat,
        ]

        console.log(values)
        db.query(query, [values], (err, data)=>{
            if(err) return res.status(403).send("could not upload post")
            //console.log(data)
            return res.status(200).send("posted")
        })
    })
}

export const deletePost = (req, res) =>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send("access denied!, user not authenticated")
    jwt.verify(token, "jwtkey", (err, data)=>{
        if(err) res.status(403).send("invalid token")
        //console.log(data)
        let id = req.params.id

        const query = `DELETE FROM posts WHERE id = ? AND userid = ? `

        db.query(query, [id, data.id], (err, data)=>{
            if(err) return res.status(403).send("could not delete post")
            //console.log(data)
            return res.status(200).send("post has been deleted")
        })
    })
}

export const updataPost = (req, res) =>{
    const token = req.cookies.access_token;
    if(!token) return res.status(401).send("access denied!, user not authenticated")
    jwt.verify(token, "jwtkey", (err, data)=>{
        if(err) res.status(403).send("invalid token")
        //console.log(data)
        let id = req.params.id

        const query = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id` = ? AND `userid` = ?"

        const values = [
            req.body.title,
            req.body.desc,
            req.body.img,
            req.body.cat,
        ]

        db.query(query, [...values, id, data.id], (err, data)=>{
            if(err) return res.status(403).send("could not upload post")
            //console.log(data)
            return res.status(200).send("updated sucessfully")
        })
    })
}
