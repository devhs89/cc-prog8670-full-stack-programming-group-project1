// Validation Middleware
const emailValidator = (val) => {
  return /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
};

const passwordValidator = (val) => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(val);
};

module.exports.emailValidator = emailValidator;
module.exports.passwordValidator = passwordValidator;