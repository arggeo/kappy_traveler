const express = require('express');
const router = express.Router();

const requestLogger = require('../middlewares/requestLogger');

// Get sight based on id
router.get('/:id', requestLogger, (req, res) => {
    //const id = req.params.id;
    res.error('Not found', 401);
});

router.get('/', (req, res) => {
    res.ok('It works');
});

module.exports = router;