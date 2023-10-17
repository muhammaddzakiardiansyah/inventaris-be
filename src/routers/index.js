const express = require('express');
const items = require('./items.router');
const laboratories = require('./laboratories.router');
const router = express();

router.use('/laboratories', laboratories);
router.use('/items', items);

module.exports = router;