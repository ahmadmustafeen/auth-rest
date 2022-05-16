const express = require("express");
const { LOGIN_REQUIRED_FIELDS } = require("../../../constants");
const { ApiResponse, validate } = require("../../../helpers");
const app = express();


app.post("/", (req, res) => {
    const missingFields = validate(req.body,LOGIN_REQUIRED_FIELDS);
    if (missingFields) {
        return res.status(400).send(ApiResponse(`Missing fields: ${missingFields.join(", ")}`));
    }
    //work here
    return res.send(ApiResponse("Success"));
});

module.exports = app;
