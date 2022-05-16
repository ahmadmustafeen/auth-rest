const express = require("express");
const { default: mongoose } = require("mongoose");
const userSchema = require("./src/models/UserSchema");
const userAuthRoutes = require("./src/routes/");
const app = express();

const bodyParser = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;
app.use(express.json({extended: true}))
app.use(bodyParser.json());
app.use(express.urlencoded());

const connect = mongoose.connect(process.env.MONGODB_PATH, {
  useNewUrlParser: true,
});

connect.then(
  () => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  },
  (err) => {
    console.log(err);
  }
);
app.use("/user",userAuthRoutes)
app.get("/", async (req, res) => {
  const user = await userSchema.find()
  res.send({user});
});
