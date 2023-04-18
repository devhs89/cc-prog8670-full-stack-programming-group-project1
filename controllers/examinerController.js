const loginDto = require('../dtos/loginDto');
const accountDto = require("../dtos/accountDto");
const bookingModel = require("../models/bookingDetailsModel");

async function findBookings(res, filter = {}) {
  await bookingModel.find(filter, (esErr, esRes) => {
    if (esRes) {
      return res.render('examiner', {
        currentView: filter.testType ? filter.testType : '',
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        bookings: esRes,
        docTitle: "Examiner - DriveTest"
      });
    } else {
      const allMsg = [];
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
}

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
  await findBookings(res, filter);
};

const update = async (req, res) => {
  const docId = req.body?.updateBtn;
  if (!docId) {
    return res.render('examiner', {
      formErrors: [],
      isLogged: loginDto.email,
      userType: loginDto.userType,
      accountInfo: accountDto,
      docTitle: "Examiner - DriveTest"
    });
  }
  await bookingModel.findById(docId, async (euFbiErr, euFbiRes) => {
    let currDoc = null;
    if (euFbiRes) {
      currDoc = euFbiRes;
      const params = {
        passed: req.body.passCheck === 'on',
        comments: req.body.commentInput ? [...currDoc.comments, req.body.commentInput] : currDoc.comments
      };
      await bookingModel.findByIdAndUpdate(docId, params, {new: true}, async (euFbiAuErr, euFbiAuDoc) => {
        if (euFbiAuDoc) {
          await findBookings(res);
        } else {
          const allMsg = [];
          if (euFbiAuErr?.errors) {
            const esAllErrs = euFbiAuErr.errors;
            for (const kn in esAllErrs) {
              allMsg.push(esAllErrs[kn].message);
            }
          }
          if (euFbiAuErr?.writeErrors) {
            const esAllErrs = euFbiAuErr.writeErrors;
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
    } else {
      return res.render('examiner', {
        formErrors: [],
        isLogged: loginDto.email,
        userType: loginDto.userType,
        accountInfo: accountDto,
        docTitle: "Examiner - DriveTest"
      });
    }
  }).clone();
};

module.exports = {show, update};