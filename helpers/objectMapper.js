const accountDto = require("../dtos/accountDto");
const yearsCalculator = require("./yearsCalculator");
const loginDto = require("../dtos/loginDto");
const bookingDetailsDto = require("../dtos/bookingDetailsDto");
const carDto = require("../dtos/carDto");

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
};

// Login DTO mapper
const mapLoginDto = dt => {
  loginDto.email = dt.email;
  loginDto.userType = dt.userType;
};

// Update Account DTO mapper
const mapUpdatedAccountDto = (oldDoc, newDoc) => {
  const changedAccountFields = {};
  if (!oldDoc.firstName && newDoc.firstName) changedAccountFields["firstName"] = accountDto.firstName = newDoc.firstName;
  if (!oldDoc.lastName && newDoc.lastName) changedAccountFields["lastName"] = accountDto.lastName = newDoc.lastName;
  if ((!oldDoc.dob || yearsCalculator(oldDoc.dob) < 17) && (newDoc.dob && yearsCalculator(newDoc.dob) > 17)) {
    changedAccountFields["dob"] = accountDto.dob = newDoc.dob;
    changedAccountFields["age"] = accountDto.age = yearsCalculator(newDoc.dob);
  }
  if (oldDoc.licenseNo !== newDoc.licenseNo) changedAccountFields["licenseNo"] = accountDto.licenseNo = newDoc.licenseNo;
  return changedAccountFields;
};

// Update Car DTO mapper
const mapUpdatedCarDto = (oldDoc, newDoc) => {
  const changedCarFields = {};
  if (newDoc.make !== oldDoc.car.make || newDoc.model !== oldDoc.car.model || +newDoc.year !== oldDoc.car.year || newDoc.plateNo !== oldDoc.car.plateNo) {
    changedCarFields["make"] = carDto.make = newDoc.make;
    changedCarFields["model"] = carDto.model = newDoc.model;
    changedCarFields["year"] = carDto.year = newDoc.year;
    changedCarFields["plateNo"] = carDto.plateNo = newDoc.plateNo;
  }
  return changedCarFields;
};

// Booking Details DTO mapper
const mapBookingDetailsDto = dt => {
  bookingDetailsDto.email = dt.email;
  bookingDetailsDto.bookingDate = dt.bookingDate;
  bookingDetailsDto.carPlateNo = dt.carPlateNo;
};

module.exports = {mapAccountDto, mapLoginDto, mapUpdatedAccountDto, mapUpdatedCarDto, mapBookingDetailsDto};