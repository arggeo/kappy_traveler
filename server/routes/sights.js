require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const requestLogger = require('../middlewares/requestLogger');

// mock data
const singleSight = require('../mocks/singleSight.json');
const topSights = require('../mocks/topSights.json');

// Get sight based on cityName
router.get('/:cityName', requestLogger, async (req, res) => {
    // Constants & Variables
    const cityName = req.params.cityName;
    const geocodingFetchURL = `https://maps.google.com/maps/api/geocode/json?address=${cityName}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
    
    try {
        // Get coordinates based on address using Google Maps API
        const responseLocation = await axios.get(geocodingFetchURL);
        const coordinates = responseLocation.data.results[0].geometry.location;
        //console.log(coordinates);

        res.ok(singleSight);
    } catch (error) {
        console.log(error);
        res.error(error.message);
    }
});

router.get('/', (req, res) => {
    res.ok(JSON.parse(topSights));
});

module.exports = router;