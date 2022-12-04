const getHospitalsAPI = require('../service-components/API/getHospitals');

const Hospital = require('../../models/hospitals');

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

module.exports = retSightsHospital;