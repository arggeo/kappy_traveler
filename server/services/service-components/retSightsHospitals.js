import getHospitalsAPI from '../service-components/API/getHospitals.js';
import Hospital from '../../models/hospitals.js';

const retSightsHospital = async function (sights, cityName) {
    let sightsHospitals = (await Promise.all(sights.map(sight => getHospitalsAPI(cityName, sight.location.lat, sight.location.lng)))).map(sh => sh.data.results);
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

    // save to database
    const savedHospitals = [];
    for (const hospitalSet of hospitalSetsToSave) {
        const hospitals = await hospitalSet;
        savedHospitals.push(hospitals);
    }

    return savedHospitals;
}

export default retSightsHospital;