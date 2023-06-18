import mysql from "mysql";


export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port:"3308",
    password: "Alex1234",
    database: "blog",
})