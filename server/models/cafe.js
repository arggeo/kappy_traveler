const { model } = require('mongoose');
const cafeSchema = require('../schemas/cafe');

const Cafe = model('Cafe', cafeSchema);

module.exports = Cafe;