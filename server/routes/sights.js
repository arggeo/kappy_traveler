require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const requestLogger = require('../middlewares/requestLogger');
const urlParser = require('../helpers/urlParser');

// mock data
const singleSight = require('../mocks/singleSight.json');
const topSights = require('../mocks/topSights.json');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;

// Get sight based on cityName
// search for "drama" to find errors
// save sight rating && total ratings
router.get('/:cityName', requestLogger, async (req, res) => {
    // Constants & Variables
    const cityName = req.params.cityName;
    
    try {
        // Get sigths
        let sights = await getSights(cityName);
        sights = sights.map(sight => {
            return {
                name: sight.name,
                city: cityName,
                location: sight.geometry.location,
                avgRating: sight.rating,
                totalRatings: sight.user_ratings_total
            };
        });

        // Get cafes per sight
        let sightsCafes = (await Promise.all(sights.map(sight => getCafes(cityName, sight.location.lat, sight.location.lng)))).map(sc => sc.data.results);
        sightsCafes = sightsCafes.map(sightCafes => {
            return sightCafes.map(sc => {
                return {
                    name: sc.name,
                    placeId: sc.place_id,
                    vicinity: sc.vicinity,
                    rating: sc.rating,
                    location: sc.geometry,
                    priceLevel: sc.price_level
                }
            });
        });

        // Get hospitals per sight
        let sightsHospitals = (await Promise.all(sights.map(sight => getHospitals(cityName, sight.location.lat, sight.location.lng)))).map(sh => sh.data.results);
        sightsHospitals = sightsHospitals.map(sightHospitals => {
            return sightHospitals.map(sh => {
                return {
                    name: sh.name,
                    placeId: sh.place_id,
                    vicinity: sh.vicinity,
                    rating: sh.rating,
                    location: sh.geometry,
                    priceLevel: sh.price_level
                }
            });
        });

        // start preparing response
        sights = sights.map((sight, idx) => {
            sight.nearbyCoffeeShops = sightsCafes[idx];
            sight.nearbyHospitals = sightsHospitals[idx];
            return sight;
        });

        // res.ok(sights);
        res.ok(singleSight);
    } catch (error) {
        console.log(error);
        res.error(error.message);
    }
});

router.get('/', (req, res) => {
    res.ok(JSON.parse(topSights));
});

async function getSights(cityName) {
    const sightsFetchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    const sightsResponse = await axios.get(sightsFetchURL);
    return sightsResponse.data.results;
}

function getCafes(cityName, lat, lng) {
    const cafesFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=cafe&radius=1000`;
    return axios.get(cafesFetchURL);
}

function getHospitals(cityName, lat, lng) {
    const hospitalsFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=hospital&radius=1500`;
    return axios.get(hospitalsFetchURL);
}

module.exports = router;