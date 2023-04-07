const appointmentModel = require('../models/appointmentModel');
const loginDto = require("../dtos/loginDto");
const accountDto = require("../dtos/accountDto");
const errMsg = require("../constants/errorMessage");

const saveAll = (req, res) => {
  const payload = [];

  try {
    const parsedTimeSlots = JSON.parse(req.body['allTimeSlots']);
    for (const v of parsedTimeSlots) {
      payload.push({slot: v});
    }
  } catch (e) {
    res.render('appointment', {
      formErrors: [errMsg.internalServerError],
      isLogged: loginDto.email,
      userType: loginDto.userType,
      accountInfo: accountDto,
      docTitle: "Appointments - DriveTest"
    });
  }
  appointmentModel.insertMany(payload, (aErr, aRes) => {
    if (aRes) {
      res.status = 200;
      res.redirect('/appointment');
    } else {
      const allMsg = [errMsg.insertFailed];
      if (aErr?.errors) {
        const aAllErrs = aErr.errors;
        for (const kn in aAllErrs) {
          allMsg.push(aAllErrs[kn].message);
        }
      }
      if (aErr?.writeErrors) {
        const aAllErrs = aErr.writeErrors;
        for (const kn in aAllErrs) {
          allMsg.push(aAllErrs[kn].err.errmsg.split(':')[0]);
        }
      }
      res.render('appointment', {
        formErrors: allMsg,
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        docTitle: "Appointments - DriveTest"
      });
    }
  });
};

module.exports = {saveAll};