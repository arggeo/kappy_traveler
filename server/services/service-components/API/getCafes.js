require('dotenv').config({path:'../../../.env'})
const axios = require('axios');

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getCafes = function (cityName, lat, lng) {
    const cafesFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=cafe&radius=500`;
    return axios.get(cafesFetchURL);
}

module.exports = getCafes;