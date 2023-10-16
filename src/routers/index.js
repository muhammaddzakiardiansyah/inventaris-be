const express = require('express');
const laboratories = require('./laboratories.router');
const router = express();

router.use('/laboratories', laboratories);

module.exports = router;