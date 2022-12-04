// Package imports
require('dotenv').config({path:'../.env'})

// model imports
const Sight = require('../models/sights');

// custom imports
const urlParser = require('../helpers/urlParser');
const searchDB = require('../helpers/searchDB');

const retImages = require('../services/service-components/retImages');
const retSights = require('../services/service-components/retSights');
const retSightsHistory = require('../services/service-components/retSightsHistory');
const retSightsCafes = require('../services/service-components/retSightsCafes');
const retSightsHospitals = require('../services/service-components/retSightsHospitals');

// mock data
const singleCity = require('../mocks/singleCity.json');
const topSights = require('../mocks/topSights.json');


async function getSights(cityName){

    try {
        // check for duplicate sights in database, if stored serve those
        let savedSights = await searchDB(cityName);
        if (savedSights.length)
            return savedSights

        // return sights
        let sights  = await retSights(cityName);
        
        // return history per sight
        let sightsHistory = await retSightsHistory(sights);

        // map history to each sight
        sights = sights.map(sight => {
            const history = sightsHistory.find(sHistory => sHistory.title === sight.name);

            sight.body = history?.extract;
            sight.excerpt = history?.extract ? history.extract.slice(0, 200) + '...' : '';

            return sight;
        });
        
        // return images per place
        let imagesForPlaces = await retImages(sights);
        
        // map images to each place
        sights = sights.map((sight, idx) => {
            sight.images = imagesForPlaces[idx];
            return sight;
        });

        // return cafes per sight
        let sightsCafes = await retSightsCafes(sights, cityName);

        // return hospitals per sight
        let sightsHospitals = await retSightsHospitals(sights, cityName);

        // retrieve cafes and hospitals from database and map to sights 
        sights = sights.map((sight, idx) => {
            sight.nearbyCoffeeShops = sightsCafes[idx];
            sight.nearbyHospitals = sightsHospitals[idx];
            return sight;
        });

        await Sight.insertMany(sights);

        sights = sights.map(sight => {
            sight.images = sight.images.map(img => urlParser(img));
            return sight;
        });

        return sights;
    } catch (error) {
        console.log(error);
    }
}

function getTopSights() {
   return topSights;
}

module.exports = {
    getSights,
    getTopSights
 } 