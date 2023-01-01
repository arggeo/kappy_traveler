// package imports
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app = express();

// custom imports
import responseFormatter from './middlewares/response.js';
import sightsRoutes from './routes/sights.js';
import dbConnect from './helpers/dbConnection.js';

// constants & variables
const port = process.env.PORT;

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

// Connect to MongoDB
dbConnect(app);