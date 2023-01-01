import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getHospitals = function (cityName, lat, lng) {
    const hospitalsFetchURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${GOOGLE_MAPS_API_KEY}&keyword=${cityName}&location=${lat},${lng}&type=hospital&radius=1500`;
    return axios.get(hospitalsFetchURL);
}

export default getHospitals;