// Module Imports
const express = require('express');
const _ = require('ejs');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const __ = require('./data/dbContext');

// Create Express Application
const app = new express();

// App Settings
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({secret: process.env.SESSION_TOKEN}));

// Server listening on port 41001
app.listen(41001, () => {
  console.log("Listening on: http://localhost:41001/");
});

// Application Routes
require('./routes')(app);
