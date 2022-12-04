const axios = require('axios');

const getSightsHistory = function (sightName) {
    const historyFetchURL = `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${sightName}`;
    return axios.get(historyFetchURL);
}

module.exports = getSightsHistory;