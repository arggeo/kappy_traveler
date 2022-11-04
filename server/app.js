// package imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const axios = require('axios');

// custom imports
const responseFormatter = require('./middlewares/response');
const sightsRoutes = require('./routes/sights');

// constants & variables
const port = process.env.PORT;
// const dbUser = process.env.MONGO_USERNAME;
// const dbPass = process.env.MONGO_PASSWORD;
// const DBUri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.x56ri.mongodb.net/?retryWrites=true&w=majority`;

// Connect to MongoDB
// mongoose.connect(DBUri);

// support urlencoded data
app.use(express.urlencoded({ extended: true }));

// additional functionality (shortcuts) on response object
app.use(responseFormatter);

// default route
app.all('/', (req, res) => {
   res.placeholder("Nothing to see here");
});

// serve sights route
app.use('/sights', sightsRoutes);

// start listening for requests
app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});