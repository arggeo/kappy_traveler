const { model } = require('mongoose');
const hospitalSchema = require('../schemas/hospitals');

const Hospital = model('Hospital', hospitalSchema);

module.exports = Hospital;