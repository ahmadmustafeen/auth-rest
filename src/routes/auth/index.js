const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("Hello Loin");
})
app.use("/login", require("./login"));
app.use("/register", require("./register"));

module.exports = app;