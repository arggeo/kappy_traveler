const express = require('express');
const router = express.Router();
const axios = require('axios');
const findTopLocations = require('../helpers/findTopLocations');


const requestLogger = require('../middlewares/requestLogger');

// mock data
const singleSight = require('../mocks/singleSight.json');
const topSights = require('../mocks/topSights.json');
const locationPlaces = require('../mocks/locationPlaces.json');

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

        const topLocations = findTopLocations(locationPlaces);
        //console.log(topLocations);
        res.ok(singleSight);
    } catch (error) {
        console.log(error);
        res.error(error.message);
    }
});

router.get('/', (req, res) => {
    res.ok(topSights);
});

module.exports=router;