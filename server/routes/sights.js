const express = require('express');
const router = express.Router();

const requestLogger = require('../middlewares/requestLogger');

const sightsController = require('../controllers/sights.controller');

// Get sight based on cityName
router.get('/:cityName', requestLogger, sightsController.get);

// Get top sights on default route
router.get('/', sightsController.getDefaultRoute);

module.exports = router;