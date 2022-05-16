const express = require('express');
const { VERIFY_OTP_FIELDS } = require('../../../constants');
const { USER_DOESNT_EXIST_MESSAGE, INVALID_OTP } = require('../../../constants/errorMessages');
const { USER_VERIFIED_SUCCESSFULLY } = require('../../../constants/successMessage');
const { validate, ApiResponse } = require('../../../helpers');
const otpSchema = require('../../../models/OTPSchema');
const userSchema = require('../../../models/UserSchema');
const app = express();


app.post("/", (req, res) => {
    const validation =  validate(req.body, VERIFY_OTP_FIELDS)
    if(validation){
    return res.status(400).send(ApiResponse({},`Some fields are missing: ${validation}`,false));
    }
    otpSchema.findOne({otp: req.body.otp, email: req.body.email}, (err, otp) => {
        if(otp){
            userSchema.findOneAndUpdate({email: req.body.email}, {$set: {verified: true}}, async (err, user) => {
                if(user){
                    await otpSchema.findOneAndDelete({email: req.body.email, otp: req.body.otp});
                    return res.status(200).send(ApiResponse({},USER_VERIFIED_SUCCESSFULLY,true));
                }
                return res.status(400).send(ApiResponse({},USER_DOESNT_EXIST_MESSAGE,false));
            })
        }
        else{
            return res.status(400).send(ApiResponse({},INVALID_OTP,false));
        }
    })
});

module.exports = app;