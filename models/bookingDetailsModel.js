const mongoose = require('mongoose');
const errMsg = require('../constants/errorMessage');
const customValidator = require("../helpers/validators");
const Schema = mongoose.Schema;

// AppUser Model
const bookingDetailsSchema = new Schema({
  email: {
    type: String, required: true, validate: {validator: customValidator.emailValidator, message: errMsg.invalidEmail}
  }, bookingDate: {type: String, required: true}, carPlateNo: {type: String, required: true}
});

const bookingDetailsModel = mongoose.model('booking', bookingDetailsSchema);
module.exports = bookingDetailsModel;