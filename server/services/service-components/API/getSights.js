require('dotenv').config({path:'../../../.env'})
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const getSights = async function (cityName) {
    const sightsFetchURL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+${cityName}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
        const res = await axios.get(sightsFetchURL);
    
        if (res.status !== 200) {
            throw new Error('Data not retrieved');
        }

        return res;
    } catch (e) {
        console.log(e);
    }
}

export default getSights;