const accountModel = require("../models/accountModel");

// Authentication Middlewares
const userExists = (req, res, next) => {
  accountModel.findOne({email: req.session.email}, 'email userType', (amErr, amDoc) => {
    if (amErr || !amDoc) res.redirect('/404');
    next();
  }).clone();
};

const isAdmin = (req, res, next) => {
  accountModel.findOne({email: req.session.email}, 'email userType', (amErr, amDoc) => {
    if (amErr || !amDoc || amDoc.userType !== 'admin') res.redirect('/404');
    next();
  }).clone();
};

module.exports = {userExists, isAdmin};