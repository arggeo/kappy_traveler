const { model } = require('mongoose');
const sightSchema = require('../schemas/sights');

const Sight = model('Sight', sightSchema);

module.exports = {
   Sight
};