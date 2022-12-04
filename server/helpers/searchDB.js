const urlParser = require('./urlParser');
const Sight = require('../models/sights');

const searchDB = async function (cityName) {
    let savedSights = await Sight.find({ city: cityName }).populate(['nearbyCoffeeShops', 'nearbyHospitals']).lean();
    savedSights = savedSights.map(sight => {
        sight.images = sight.images.map(img => urlParser(img));
        return sight;
    });
    return savedSights;
}
module.exports = searchDB;