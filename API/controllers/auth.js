import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

export const greetings = (req, res) =>{
    res.send("welcome Alexander to the auth route")
}

export const register = (req, res) => {

    let username = req.body.username
    let password = req.body.password
    let email = req.body.email

    
    //check whether user already exists

    const getQuery = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(getQuery, [email, username], (err, data)=>{
        if(err) return console.log(err.message)
        //if user already exists
        if(data.length) return res.status(409).send("user already exists");


        //Hash the password and create a user
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);

        const addQuery = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
        const values = [username, email, hash,];
        db.query(addQuery, [values], (err, data)=>{
            if(err) return console.log(err)
            console.log("new user added")
            return res.status(200).send("user added succesfully");
        })

    })
    
}

export const login = (req, res) => {
    let username = req.body.username

    
    //check whether user already exists

    const getQuery = "SELECT * FROM users WHERE username = ?"
    db.query(getQuery, [username], (err, data)=>{
        if(err) return res.send(err)

        //if user is not found
        if(data.length < 1) return res.status(404).send("user not found")

        //compare passwords
        let isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);
        
        if(!isPasswordCorrect) return res.status(400).send("wrong username or password");

        //creating token
        const token = jwt.sign({id: data[0].id}, "jwtkey")

        //seperating password from data to save in cookie
        const{ password , ...other } = data[0];

        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(other)

        //console.log(res.cookie);
    })
}

export const logout = (req, res) => {
    res.clearCookie("access_token", {
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")
}