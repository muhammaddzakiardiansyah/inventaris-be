const express = require('express');
const items = require('./items.router');
const laboratories = require('./laboratories.router');
const specifications = require('./specifications.router');
const router = express();

router.use('/laboratories', laboratories);
router.use('/items', items);
router.use('/specifications', specifications);

module.exports = router;