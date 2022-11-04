// package imports
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// custom imports
const responseFormatter = require('./middlewares/response');
const sightsRoutes = require('./routes/sights');

// constants & variables
const port = process.env.PORT;

// Connect to MongoDB
// mongoose.connect(`${process.env.MONGO_USERNAME} ${process.env.MONGO_PASSWORD}`);

var count_req = 0;
const requests = [];

app.use( (req,res,next) => {
   console.log("route",req.route);
   count_req++;
   requests.push(req.route);

   next();
});

// support urlencoded data
app.use(express.urlencoded({ extended: true }));

// additional functionality (shortcuts) on response object
app.use(responseFormatter);

// default route
app.all('/', (req, res) => {
   res.placeholder("Nothing to see here");
});

// serve sights route
app.use('/sights' , sightsRoutes);

// start listening for requests
app.listen(port, () => {
   console.log(`App running on port ${port}...`);
});