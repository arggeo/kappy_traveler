require('dotenv').config({path:'../../../.env'})
const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getSights = async function (cityName) {
    const sightsFetchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${cityName}&key=${GOOGLE_MAPS_API_KEY}`;
    const sightsResponse = await axios.get(sightsFetchURL);
    return sightsResponse.data.results;
}

module.exports = getSights;