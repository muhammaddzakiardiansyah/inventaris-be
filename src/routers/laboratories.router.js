const express = require('express');
const laboratoriesController = require("../controllers/laboratories.controller");
const laboratories = express();

laboratories.get('/', laboratoriesController.get);
laboratories.post('/', laboratoriesController.add);

module.exports = laboratories;