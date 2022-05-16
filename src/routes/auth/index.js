const express = require("express");
const app = express();



app.get("/", (req, res) => {
    res.send("Hello Loin");
})
app.use("/login", require("./login"));
app.use("/register", require("./register"));
app.use("/forgetpassword", require("./forgetpassword"));
app.use("/verifyotp", require("./verifyotp"));
app.use("/resetpassword", require("./resetpassword"));

module.exports = app;