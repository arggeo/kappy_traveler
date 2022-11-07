// package imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const axios = require('axios');

// custom imports
const responseFormatter = require('./middlewares/response');
const requestLogger = require('./middlewares/requestLog');
const sightsRoutes = require('./routes/sights');
const dbConnect = require('./helpers/dbConnection');

// constants & variables
const port = process.env.PORT;

// support urlencoded data
app.use(express.urlencoded({ extended: true }));

// additional functionality (shortcuts) on response object
app.use(responseFormatter);

app.use(requestLogger);
// default route
app.all('/', (req, res) => {
   res.placeholder("Nothing to see here");
});

// serve sights route
app.use('/sights', sightsRoutes);

// Connect to MongoDB
dbConnect(app);