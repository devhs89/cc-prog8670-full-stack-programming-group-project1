const accountDto = require("../dtos/accountDto");
const yearsCalculator = require("./yearsCalculator");
const loginDto = require("../dtos/loginDto");
const {bookingDetailsDto} = require("../dtos/bookingDetailsDto");

// Account DTO mapper
const mapAccountDto = dt => {
  accountDto.email = dt.email;
  accountDto.userType = dt.userType;
  accountDto.firstName = dt.firstName;
  accountDto.lastName = dt.lastName;
  const age = yearsCalculator(dt.dob);
  accountDto.dob = dt.dob;
  accountDto.age = age;
  accountDto.licenseNo = dt.licenseNo;
  accountDto.car.make = dt.car.make;
  accountDto.car.model = dt.car.model;
  accountDto.car.year = dt.car.year;
  accountDto.car.plateNo = dt.car.plateNo;
};

// Login DTO mapper
const mapLoginDto = dt => {
  loginDto.email = dt.email;
  loginDto.userType = dt.userType;
};

// Update Account DTO mapper
const mapUpdatedAccountDto = (oldDoc, ud) => {
  const changedAccountFields = {};
  const changedCarFields = {};
  if (!oldDoc.firstName && ud.firstName) changedAccountFields["firstName"] = accountDto.firstName = ud.firstName;
  if (!oldDoc.lastName && ud.lastName) changedAccountFields["lastName"] = accountDto.lastName = ud.lastName;
  if ((!oldDoc.dob || yearsCalculator(oldDoc.dob) < 17) && (ud.dob && yearsCalculator(ud.dob) > 17)) {
    changedAccountFields["dob"] = accountDto.dob = ud.dob;
    changedAccountFields["age"] = accountDto.age = yearsCalculator(ud.dob);
  }
  if (oldDoc.licenseNo !== ud.licenseNo) changedAccountFields["licenseNo"] = accountDto.licenseNo = ud.licenseNo;
  if (ud.make !== oldDoc.car.make || ud.model !== oldDoc.car.model || +ud.year !== oldDoc.car.year || ud.plateNo !== oldDoc.car.plateNo) {
    changedCarFields["make"] = accountDto.car.make = ud.make;
    changedCarFields["model"] = accountDto.car.model = ud.model;
    changedCarFields["year"] = accountDto.car.year = ud.year;
    changedCarFields["plateNo"] = accountDto.car.plateNo = ud.plateNo;
    changedAccountFields["car"] = changedCarFields;
  }
  return changedAccountFields;
};

// Booking Details DTO mapper
const mapBookingDetailsDto = ud => {
  bookingDetailsDto.email = ud.email;
  bookingDetailsDto.testType = ud.testType;
  bookingDetailsDto.comments = ud.comments;
  bookingDetailsDto.outcome = ud.outcome;
  bookingDetailsDto.bookingDate = ud.bookingDate;
  bookingDetailsDto.car.make = ud.make;
  bookingDetailsDto.car.model = ud.model;
  bookingDetailsDto.car.year = ud.year;
  bookingDetailsDto.car.plateNo = ud.plateNo;
  return bookingDetailsDto;
};

module.exports = {mapAccountDto, mapLoginDto, mapUpdatedAccountDto, mapBookingDetailsDto};