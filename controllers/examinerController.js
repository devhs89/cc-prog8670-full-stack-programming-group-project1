const loginDto = require('../dtos/loginDto');
const accountDto = require("../dtos/accountDto");
const bookingModel = require("../models/bookingDetailsModel");
const errMsg = require("../constants/errorMessage");

const show = async (req, res) => {
  // set filter according to selected option
  let filter;
  switch (req.body.testType) {
    case 'g2':
      filter = {testType: 'g2'};
      break;
    case 'g':
      filter = {testType: 'g'};
      break;
    default:
      filter = {};
  }

  await bookingModel.find(filter, (esErr, esRes) => {
    if (esRes) {
      console.log(esRes);
      return res.render('examiner', {
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        bookings: esRes,
        docTitle: "Examiner - DriveTest"
      });
    } else {
      const allMsg = [errMsg.insertFailed];
      if (esErr?.errors) {
        const esAllErrs = esErr.errors;
        for (const kn in esAllErrs) {
          allMsg.push(esAllErrs[kn].message);
        }
      }
      if (esErr?.writeErrors) {
        const esAllErrs = esErr.writeErrors;
        for (const kn in esAllErrs) {
          allMsg.push(esAllErrs[kn].err.errmsg.split(':')[0]);
        }
      }
      return res.render('examiner', {
        formErrors: allMsg,
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        docTitle: "Examiner - DriveTest"
      });
    }
  }).clone();
};

const update = (req, res) => {
  console.log("Here");
  console.log(req.body);
};

module.exports = {show, update};