// Package imports
import * as dotenv from 'dotenv';
dotenv.config();

// model imports
import Sight from '../models/sights.js';
import Search from '../models/searches.js';

// custom imports
import urlParser from '../helpers/urlParser.js';
import searchDB from '../helpers/searchDB.js';

import retImages from '../services/service-components/retImages.js';
import retSights from '../services/service-components/retSights.js';
import retSightsHistory from '../services/service-components/retSightsHistory.js';
import retSightsCafes from '../services/service-components/retSightsCafes.js';
import retSightsHospitals from '../services/service-components/retSightsHospitals.js';

// mock data
// const singleCity = require('../mocks/singleCity.json');
// const topSights = {};


export async function getSights(cityName){

    try {
        // check for duplicate sights in database, if stored serve those
        let savedSights = await searchDB(cityName);
        if (savedSights.length)
            return savedSights

        // return sights
        let sights  = await retSights(cityName);

        if (!sights || !sights.length) {
            return [];
        }
        
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

export async function getTopSights() {
   const fetchedSearches = await Search.find({}, { _id: 0, place: 1 }).sort({ count: -1 }).lean();
   const topThreePlaces = fetchedSearches.slice(0, 5).map(pObj => pObj.place);

   console.log(topThreePlaces);

   const topSights = [];
   for (const place of topThreePlaces) {
      const placeSights = await searchDB(place);
      topSights.push(...placeSights.slice(0, 3));
   }

   return topSights;
}