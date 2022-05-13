const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("Hello Loin");
})
app.use("/login", require("./login"));

module.exports = app;