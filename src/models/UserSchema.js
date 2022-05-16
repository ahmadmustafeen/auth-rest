const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
        required: false,
    },
})

const userSchema = mongoose.model("User", UserSchema);
module.exports = userSchema;