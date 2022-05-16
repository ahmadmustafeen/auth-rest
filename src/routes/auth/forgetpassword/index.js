const express = require("express");
const { FORGET_PASSWORD_REQUIRED_FIELDS } = require("../../../constants");
const { USER_DOESNT_EXIST_MESSAGE } = require("../../../constants/errorMessages");
const { sendEmail, validate, ApiResponse } = require("../../../helpers");
const otpSchema = require("../../../models/OTPSchema");
const userSchema = require("../../../models/UserSchema");

const app = express();


app.get("/",async (req, res) => {
    const requiredFields = validate(req.body,FORGET_PASSWORD_REQUIRED_FIELDS);
    if(requiredFields){
    return res.status(400).send(ApiResponse(null, `Missing required fields: ${requiredFields}`, false));
    }
    const {email} = req.body;
    const userExists = await userSchema.findOne({email});
    if(!userExists){
    return res.status(400).send(ApiResponse(null, USER_DOESNT_EXIST_MESSAGE, false));
    }
    const OTP = Math.floor(Math.random() * 10000);
    const content = `Your OTP is ${OTP}`;
    const header = "OTP";
    if(await sendEmail(email, header, content)){
        const otpschema = new otpSchema()
        otpschema.email = email;
        otpschema.otp = OTP;
        await otpschema.save();
        return res.status(200).send(ApiResponse(OTP, "OTP sent successfully", true));
    }
    else{
        return res.status(400).send(ApiResponse(OTP, "OTP not sent", false));
    }
});


module.exports = app;