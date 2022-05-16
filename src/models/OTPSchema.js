const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OtpSchema = new Schema({
    otp: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    
})

OtpSchema.index({ email: 1, expireAt: 1 }, { expireAfterSeconds: 300 });
const otpSchema = mongoose.model("OTP", OtpSchema);
module.exports = otpSchema;