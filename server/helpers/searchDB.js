import urlParser from './urlParser.js';
import Sight from '../models/sights.js';

const searchDB = async function (cityName) {
    let savedSights = await Sight.find({ city: cityName }).populate(['nearbyCoffeeShops', 'nearbyHospitals']).lean();
    savedSights = savedSights.map(sight => {
        sight.images = sight.images.map(img => urlParser(img));
        return sight;
    });
    return savedSights;
}

export default searchDB;