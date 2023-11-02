const express = require('express');
const items = require('./items.router');
const laboratories = require('./laboratories.router');
const specifications = require('./specifications.router');
const items_borrowed = require('./items_borrowed.router');
const router = express();

router.use('/laboratories', laboratories);
router.use('/items', items);
router.use('/specifications', specifications);
router.use('/items-borrowed', items_borrowed);

module.exports = router;