require('dotenv').config();
const express = require('express');
const app = express();

const responseFormatter = require('./middlewares/response');

// support urlencoded data
app.use(express.urlencoded({ extended: true }));

// additional functionality (shortcuts) on response object
app.use(responseFormatter);

// default route
app.all('/', async (req, res) => {
   res.placeholder("Nothing to see here");
});

// start listening for requests
app.listen(3000, () => {
   console.log('App running on port 3000...');
});