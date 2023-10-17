const express = require('express');
const laboratoriesController = require("../controllers/laboratories.controller");
const laboratories = express();

laboratories.get('/', laboratoriesController.get);
laboratories.get('/:id', laboratoriesController.detail);
laboratories.post('/', laboratoriesController.add);
laboratories.put('/:id', laboratoriesController.edit);
laboratories.delete('/:id', laboratoriesController.remove);

module.exports = laboratories;