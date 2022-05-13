const express = require("express");
const { ApiResponse } = require("../../../helpers");
const app = express();


app.post("/",(req,res)=>{
    res.send(ApiResponse(req.body));
})

module.exports = app;