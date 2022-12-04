require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');

const requestLogger = require('../middlewares/requestLogger');
const urlParser = require('../helpers/urlParser');
const findTopLocations = require('../helpers/findTopLocations');
const Cafe = require('../models/cafe');
const Hospital = require('../models/hospitals');
const Sight = require('../models/sights');

// mock data
const singleCity = require('../mocks/singleCity.json');
const topSights = require('../mocks/topSights.json');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const FLICKR_API_KEY = process.env.FLICKR_API_KEY;

// Get sight based on cityName
router.get('/:cityName', requestLogger, async (req, res) => {

    // Constants & Variables
    const cityName = req.params.cityName;
    console.log("Starting routing sights......");
    try {
        let savedSights = await Sight.find({ city: cityName }).populate(['nearbyCoffeeShops', 'nearbyHospitals']).lean();
        
        if (savedSights.length) {
            savedSights = savedSights.map(sight => {
                sight.images = sight.images.map(img => urlParser(img));
                return sight;
            });

            //const topSights = findTopLocations(savedSights);
            return res.ok(savedSights);
        }

        // Get sigths
        let sights = await getSights(cityName);
        sights = sights.map(sight => {
            return {
                name: sight.name,
                city: cityName,
                location: sight.geometry?.location,
                avgRating: sight.rating,
                totalRatings: sight.user_ratings_total
            };
        });

        sights = findTopLocations(sights);
        //console.log("top sights are: ",sigthts);

        if (!sights.length) {
            return res.error('No sights found for selected location');
        }

        // Get history per sight
        let sightsHistory = (await Promise.all(sights.map(sight => getSightsHistory(sight.name)))).map(sh => {
            const data = Object.values(sh.data.query.pages);
            return {
                title: data[0].title,
                extract: data[0]?.extract || ''
            }
        });

        sights = sights.map(sight => {
            const history = sightsHistory.find(sHistory => sHistory.title === sight.name);

            sight.body = history?.extract;
            sight.excerpt = history?.extract ? history.extract.slice(0, 200) + '...' : '';

            return sight;
        });

        // Get images per sight
        const sightsImagePromises = sights.map(sight => flickrRequestUrl(sight.location.lat, sight.location.lng));
        const imagesForPlaces = (await Promise.all(sightsImagePromises)).map(img => img.data.photos.photo);

        sights = sights.map((sight, idx) => {
            sight.images = imagesForPlaces[idx];
            return sight;
        });

        // Get cafes per sight
        let sightsCafes = (await Promise.all(sights.map(sight => getCafes(cityName, sight.location.lat, sight.location.lng)))).map(sc => sc.data.results);
        const cafeSetsToSave = [];
        sightsCafes = sightsCafes.map(sightCafes => {
            const tempCafes = sightCafes.map(sc => {
                return {
                    name: sc.name,
                    placeId: sc.place_id,
                    vicinity: sc.vicinity,
                    rating: sc.rating || 0,
                    location: sc.geometry.location,
                    priceLevel: sc.price_level || 0
                }
            });

            cafeSetsToSave.push(Cafe.insertMany(tempCafes));

            return tempCafes;
        });

        const savedCafes = [];
        for (const cafesSet of cafeSetsToSave) {
            const cafes = await cafesSet;
            savedCafes.push(cafes);
        }

        // Get hospitals per sight
        let sightsHospitals = (await Promise.all(sights.map(sight => getHospitals(cityName, sight.location.lat, sight.location.lng)))).map(sh => sh.data.results);
        const hospitalSetsToSave = [];
        sightsHospitals = sightsHospitals.map(sightHospitals => {
            const tempHospitals = sightHospitals.map(sh => {
                return {
                    name: sh.name,
                    placeId: sh.place_id,
                    vicinity: sh.vicinity,
                    rating: sh.rating || 0,
                    location: sh.geometry.location,
                    priceLevel: sh.price_level || 0
                }
            });

            hospitalSetsToSave.push(Hospital.insertMany(tempHospitals));

            return tempHospitals;
        });

        const savedHospitals = [];
        for (const hospitalSet of hospitalSetsToSave) {
            const hospitals = await hospitalSet;
            savedHospitals.push(hospitals);
        }

        sights = sights.map((sight, idx) => {
            sight.nearbyCoffeeShops = savedCafes[idx];
            sight.nearbyHospitals = savedHospitals[idx];
            return sight;
        });

        await Sight.insertMany(sights);

        sights = sights.map(sight => {
            sight.images = sight.images.map(img => urlParser(img));
            return sight;
        });

        res.ok(sights);
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

function getSightsHistory(sightName) {
    const historyFetchURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${sightName}`;
    return axios.get(historyFetchURL);
}

function getCafes(cityName, lat, lng) {
    const cafesFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=cafe&radius=500`;
    return axios.get(cafesFetchURL);
}

function getHospitals(cityName, lat, lng) {
    const hospitalsFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=hospital&radius=1500`;
    return axios.get(hospitalsFetchURL);
}

function flickrRequestUrl(lat, lng) {
    return axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${FLICKR_API_KEY}&format=json&nojsoncallback=?&lat=${lat}&lon=${lng}&per_page=10`);
}

module.exports = router;