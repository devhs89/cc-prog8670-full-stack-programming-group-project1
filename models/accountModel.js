const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const errMsg = require('../constants/errorMessage');
const {passwordValidator} = require("../helpers/validators");
const customValidator = require("../helpers/validators");
const Schema = mongoose.Schema;

// Account Schema
const accountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {validator: customValidator.emailValidator, message: errMsg.invalidEmail}
  },
  userType: {
    type: String, required: true, default: "driver"
  },
  password: {
    type: String, required: true, validate: {validator: passwordValidator, message: errMsg.invalidPassword}
  },
  firstName: {type: String},
  lastName: {type: String},
  licenseNo: {type: String, unique: true, sparse: true},
  dob: {type: Date},
  age: {type: Number},
  car: {
    make: {type: String}, model: {type: String}, year: {type: Number}, plateNo: {type: String}
  }
});

// Add data encryption to Password & License Number before save operations
accountSchema.pre('save', function (next) {
  const u = this;
  bcrypt.hash(u.password, 10, (error, hash) => {
    u.password = hash;
    next();
  });
});

accountSchema.pre('updateOne', function (next) {
  const bds = this.getUpdate();
  bcrypt.hash(bds.$set.licenseNo, 10, (err, hash) => {
    bds.$set.licenseNo = hash;
    next();
  });
});

const accountModel = mongoose.model('account', accountSchema);
module.exports = accountModel;