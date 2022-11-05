const { model } = require('mongoose');
const hospitalSchema = require('../schemas/hospitalSchema');

const Hospital = model('Hospital', hospitalSchema);

module.exports = Hospital;