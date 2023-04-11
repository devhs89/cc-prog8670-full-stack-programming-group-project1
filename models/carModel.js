const mongoose = require('mongoose');
const customValidator = require("../helpers/validators");
const errMsg = require("../constants/errorMessage");
const Schema = mongoose.Schema;

// Car Model
const CarSchema = new Schema({
  email: {
    type: String, required: true, validate: {validator: customValidator.emailValidator, message: errMsg.invalidEmail}
  }, cars: [{
    make: {type: String, required: true},
    model: {type: String, required: true},
    year: {type: Number, required: true},
    plateNo: {type: String, required: true, unique: true}
  }]
});

const carModel = mongoose.model('car', CarSchema);
module.exports = carModel;