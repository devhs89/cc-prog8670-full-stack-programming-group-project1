const loginDto = require('../dtos/loginDto');
const accountModel = require('../models/accountModel');
const errMsg = require('../constants/errorMessage');
const bcrypt = require('bcrypt');
const {mapAccountDto, mapLoginDto} = require("../helpers/objectMapper");

// Register Action
const register = async (req, res) => {
  const dts = req.body;
  if (dts.password !== dts.rPassword) {
    return res.render('register', {
      formErrors: [errMsg.invalidRepeatPassword],
      isLogged: loginDto.email,
      userType: loginDto.userType,
      docTitle: "Register - DriveTest"
    });
  }
  await accountModel.create(dts, (err) => {
    if (err?.errors) {
      const allErrs = err.errors;
      let allMsg = [];
      for (const kn in allErrs) {
        allMsg.push(allErrs[kn].message);
      }
      res.render('register', {
        formErrors: allMsg, isLogged: loginDto.email, userType: loginDto.userType, docTitle: "Register - DriveTest"
      });
    } else {
      res.redirect('/login');
    }
  });
};

// Login Action
const login = async (req, res) => {
  const cred = {email: req.body.email, password: req.body.password};
  let allMsg = [errMsg.invalidCred];
  await accountModel.findOne({email: cred.email}, (err, result) => {
    if (result) {
      bcrypt.compare(cred.password, result.password, (err, match) => {
        if (match) {
          mapAccountDto(result);
          req.session.userId = result._id;
          req.session.email = result.email;
          req.session.userType = result.userType;
          mapLoginDto(req.session);
          res.render('index', {isLogged: loginDto.email, userType: loginDto.userType, docTitle: "Login - DriveTest"});
        } else {
          res.render('login', {
            formErrors: allMsg, isLogged: loginDto.email, userType: loginDto.userType, docTitle: "Login - DriveTest"
          });
        }
      });
    } else {
      res.render('login', {
        formErrors: allMsg, isLogged: loginDto.email, userType: loginDto.userType, docTitle: "Login - DriveTest"
      });
    }
  }).clone();
};

// Logout Action
const logout = (req, res) => {
  // clear all stored information
  mapLoginDto({email: '', userType: ''});
  mapAccountDto({
    email: '', userType: '', firstName: '', lastName: '', dob: '', age: 0, licenseNo: '', car: {
      make: '', model: '', year: '', plateNo: ''
    }
  });
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {register, login, logout};