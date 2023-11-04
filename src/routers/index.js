const express = require('express');
const items = require('./items.router');
const laboratories = require('./laboratories.router');
const specifications = require('./specifications.router');
const items_borrowed = require('./items_borrowed.router');
const items_returned = require('./items_returned.router');
const auth = require('./auth.router');
const router = express();

router.use('/laboratories', laboratories);
router.use('/items', items);
router.use('/specifications', specifications);
router.use('/items-borrowed', items_borrowed);
router.use('/items-returned', items_returned);
router.use('/auth', auth);

module.exports = router;