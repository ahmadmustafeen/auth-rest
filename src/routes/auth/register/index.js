const bcryptjs = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const { REGISTERED_REQUIRED_FIELDS } = require("../../../constants");
const {
  USER_ALREADY_EXISTS_MESSAGE,
} = require("../../../constants/errorMessages");
const {
  REGISTER_SUCCESS_MESSAGE,
} = require("../../../constants/successMessage");
const { ApiResponse, validate } = require("../../../helpers");
const userSchema = require("../../../models/UserSchema");

const app = express();

app.post("/", async (req, res) => {
  const missingFields = validate(req.body, REGISTERED_REQUIRED_FIELDS);
  if (missingFields)
    return res
      .status(400)
      .send(ApiResponse(`Missing fields: ${missingFields.join(", ")}`));

  const userAlreadyExists = await userSchema.findOne({ email: req.body.email });
  if (userAlreadyExists)
   return res.status(400).send(ApiResponse(USER_ALREADY_EXISTS_MESSAGE));

  const { password } = req.body;
  const encryptedPassword = await bcryptjs.hash(password, 10);
  const user = new userSchema({ ...req.body, password: encryptedPassword });
  const token = jwt.sign({ email: user.email }, process.env.TOKEN_KEY, {
    expiresIn: "2h",
  });
  user.token = token;
  user.save();
  return res.status(201).send(ApiResponse(user, REGISTER_SUCCESS_MESSAGE));
});

module.exports = app;
