const express = require("express");
const app = express();


app.post("/",(req,res)=>{
    res.send("login");
})

module.exports = app;