const bcryptjs = require('bcryptjs');
const express = require('express');
const {  RESET_PASSWORD_FIELDS } = require('../../../constants');
const { PASSWORD_UPDATED_MESSAGE } = require('../../../constants/successMessage');
const { ApiResponse, validate } = require('../../../helpers');
const userSchema = require('../../../models/UserSchema');
const app = express();


app.post('/', async (req, res) => {
    const validation = validate(req.body, RESET_PASSWORD_FIELDS);
    if(validation){
        return res.status(400).send(ApiResponse({},`Some fields are missing: ${validation}`,false));
    }
    const encryptedPassword = await bcryptjs.hash(req.body.password, 10);
    userSchema.findOneAndUpdate({email:req.body.email}, {$set: {password: encryptedPassword}}, (err, user) => {
    res.send(ApiResponse({},PASSWORD_UPDATED_MESSAGE,true));
})
})
module.exports = app;