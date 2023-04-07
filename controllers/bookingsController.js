const bookingDetailsModel = require("../models/bookingDetailsModel");
const bookingDetailsDto = require("../dtos/bookingDetailsDto");
const accountDto = require("../dtos/accountDto");
const loginDto = require("../dtos/loginDto");
const accountModel = require('../models/accountModel');
const errMsg = require('../constants/errorMessage');
const {mapUpdatedAccountDto, mapAccountDto, mapBookingDetailsDto} = require("../helpers/objectMapper");

// Create Booking Action
const create = async (req, res) => {
  let cdf = {};
  // find user in database
  await accountModel.findOne({email: req.body.email}, {}, null, async (foErr, foDoc) => {
    if (!foDoc) {
      let foAllMsg = [errMsg.userNotFound];
      res.render('g2-test', {
        formErrors: foAllMsg,
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        docTitle: "G2 Test - DriveTest"
      });
    } else {
      mapBookingDetailsDto(req.body);
      cdf = mapUpdatedAccountDto(foDoc, req.body);
      // save booking under user's email
      await bookingDetailsModel.create(bookingDetailsDto, async (cErr) => {
        if (cErr?.errors) {
          const cAllErrs = cErr.errors;
          let cAllMsg = [];
          for (const kn in cAllErrs) {
            cAllMsg.push(cAllErrs[kn].message);
          }
          res.render('g2-test', {
            formErrors: cAllMsg,
            isLogged: loginDto.email,
            userType: loginDto.userType,
            accountInfo: accountDto,
            docTitle: "G2 Test - DriveTest"
          });
        } else {
          // update additional user details if provided by user while making a booking
          await accountModel.updateOne({email: req.body.email}, {$set: cdf}, null, (fauErr, dc) => {
            if (fauErr?.errors) {
              const fauAllErrs = fauErr.errors;
              let fauAllMsg = [];
              for (const kn in fauAllErrs) {
                fauAllMsg.push(fauAllErrs[kn].message);
              }
              res.render('g2-test', {
                formErrors: fauAllMsg,
                isLogged: loginDto.email,
                userType: loginDto.userType,
                accountInfo: accountDto,
                docTitle: "G2 Test - DriveTest"
              });
            } else {
              res.redirect('/g-test');
            }
          }).clone();
        }
      });
    }
  }).clone();
};

// Show Bookings Action
const show = (req, res) => {
  // find user by email
  accountModel.findOne({email: accountDto.email}, (sErr, result) => {
    if (sErr?.errors) {
      const sAllErrs = sErr.errors;
      let sAllMsg = [];
      for (const kn in sAllErrs) {
        sAllMsg.push(sAllErrs[kn].message);
      }
      res.render('g-test', {
        formErrors: sAllMsg,
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        docTitle: "G Test - DriveTest"
      });
    } else {
      mapAccountDto(result);
      // find all bookings made by the user
      bookingDetailsModel.find({email: accountDto.email}, (bdErr, bdDoc) => {
        if (result) {
          res.render('g-test', {
            isLogged: loginDto.email,
            userType: loginDto.userType,
            accountInfo: accountDto,
            bookingInfo: bdDoc,
            docTitle: 'G Test - DriveTest'
          });
        } else {
          res.render('g-test', {
            formErrors: [errMsg.bookingNotFound],
            isLogged: loginDto.email,
            userType: loginDto.userType,
            accountInfo: accountDto,
            docTitle: "G Test - DriveTest"
          });
        }
      });
    }
  });
};

// Update Action
const update = async (req, res) => {
  const id = req.body.id;
  const newBooking = {
    bookingDate: req.body.bookingDate.toString(), car: {
      make: req.body.make, model: req.body.model, year: req.body.year, plateNo: req.body.plateNo
    }
  };
  await bookingDetailsModel.findByIdAndUpdate(id, {$set: newBooking}, {new: true}, (err, doc) => {
    res.redirect('/g-test');
  }).clone();
};

module.exports = {show, update, create};
