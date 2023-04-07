const mongoose = require('mongoose');
const _ = require('dotenv').config();

// Mongoose Settings
mongoose.set({strictQuery: false});

// Get Database Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

// Connect to MongoDB
const connStr = `mongodb+srv://${dbUser}:${dbPassword}@main-cluster.z20qngn.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(connStr, {useNewUrlParser: true});
