const bcryptjs = require("bcryptjs");
const express = require("express");
const { LOGIN_REQUIRED_FIELDS } = require("../../../constants");
const {
  USER_DOESNT_EXIST_MESSAGE, INVALID_CREDENTIALS,
} = require("../../../constants/errorMessages");
const { LOGIN_SUCCESS_MESSAGE } = require("../../../constants/successMessage");
const { ApiResponse, validate } = require("../../../helpers");
const userSchema = require("../../../models/UserSchema");
const app = express();

app.post("/", async (req, res) => {
  const missingFields = validate(req.body, LOGIN_REQUIRED_FIELDS);
  if (missingFields) {
    return res
      .status(400)
      .send(ApiResponse(`Missing fields: ${missingFields.join(", ")}`));
  }
  const { email, password } = req.body;
  const userExists = await userSchema.findOne({ email: email });
  if (!userExists)
    return res
      .status(400)
      .send(ApiResponse({ email }, USER_DOESNT_EXIST_MESSAGE, false));
  if (await bcryptjs.compare(password, userExists.password))
    return res.status(200).send(ApiResponse(userExists,LOGIN_SUCCESS_MESSAGE));
  return res.status(400).send(ApiResponse({ email }, INVALID_CREDENTIALS, false));
});

module.exports = app;
