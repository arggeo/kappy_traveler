import getCafesAPI from '../service-components/API/getCafes.js';
import Cafe from '../../models/cafe.js';

const retSightsCafes = async function (sights, cityName) {
    let sightsCafes = (await Promise.all(sights.map(sight => getCafesAPI(cityName, sight.location.lat, sight.location.lng)))).map(sc => sc.data.results);
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

    // save to database
    const savedCafes = [];
    for (const cafesSet of cafeSetsToSave) {
        const cafes = await cafesSet;
        savedCafes.push(cafes);
    }
    
    return savedCafes;
}

export default retSightsCafes;