const { test } = require('vitest');
const sights = require('../services/sights.service');

async function get(req, res) {
    const cityName = req.params.cityName
    try {
        res.ok((await sights.getSights(cityName))?.data?.results);
    } catch (error) {    
        res.error(error.message);
    }   
}

function getDefaultRoute(req, res) {
    res.ok(sights.getTopSights());
}

module.exports = {
    get,
    getDefaultRoute
};