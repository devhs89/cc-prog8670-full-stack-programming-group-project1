// Years Calculation Helper
module.exports = (dt) => {
  return (Date.now() - Date.parse(dt)) / 31557600000;
};