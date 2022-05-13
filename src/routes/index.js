const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("Hello Auth");
})
app.use("/auth", require("./auth"));

module.exports = app;