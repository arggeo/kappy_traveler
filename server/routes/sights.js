const express = require('express');
const router = express.Router();

// Get sight based on id
router.get('/:id', (req, res) => {
    //const id = req.params.id;
    res.error('Not found', 401);
});

router.get('/', (req, res) => {
    res.ok('It works');
});

module.exports=router;