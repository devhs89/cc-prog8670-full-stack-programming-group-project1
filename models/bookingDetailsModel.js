const mongoose = require('mongoose');
const errMsg = require('../constants/errorMessage');
const customValidator = require("../helpers/validators");
const Schema = mongoose.Schema;

// Comments Model
const commentsSchema = new Schema({
  comment: {type: String}
});

// AppUser Model
const bookingDetailsSchema = new Schema({
  email: {
    type: String, required: true, validate: {validator: customValidator.emailValidator, message: errMsg.invalidEmail}
  },
  testType: {type: String, required: true},
  comments: {type: [commentsSchema]},
  passed: {type: Boolean, required: true},
  bookingDate: {type: String, required: true},
  car: {
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    plateNo: {type: String, required: true}
  }
});

const bookingDetailsModel = mongoose.model('booking', bookingDetailsSchema);
module.exports = bookingDetailsModel;