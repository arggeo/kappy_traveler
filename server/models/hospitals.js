const { model } = require('mongoose');
const hospitalSchema = require('../schemas/hospitalSchema');

const Hospital = model('Cafe', hospitalSchema);

module.exports = Hospital;