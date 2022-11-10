const express = require('express');
const router = express.Router();

const requestLogger = require('../middlewares/requestLogger');

// mock data
const singleSight = require('../mocks/singleSight.json');
const topSights = require('../mocks/topSights.json');

// Get sight based on cityName
router.get('/:sightName', requestLogger, (req, res) => {
    res.ok(singleSight);
});

router.get('/', (req, res) => {
    res.ok(JSON.parse(topSights));
});

module.exports = router;