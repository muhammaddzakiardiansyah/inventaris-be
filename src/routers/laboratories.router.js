const express = require('express');
const laboratoriesController = require("../controllers/laboratories.controller");
const laboratories = express();

laboratories.get('/', laboratoriesController.get);
laboratories.get('/:id', laboratoriesController.detail);
laboratories.get('/per-lab/:id', laboratoriesController.perLab);
laboratories.get('/spec-per-lab/:id', laboratoriesController.specPerLab);
laboratories.post('/', laboratoriesController.add);
laboratories.put('/:id', laboratoriesController.edit);
laboratories.delete('/:id', laboratoriesController.remove);

module.exports = laboratories;