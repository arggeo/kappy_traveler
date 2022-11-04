const { model } = require('mongoose');
const searchSchema = require('../schemas/searches');

const Search = model('Search', searchSchema);

module.exports = Search;