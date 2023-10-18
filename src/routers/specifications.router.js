const express = require('express');
const validateDataspecifications = require('../../helpers/specifications.validate');
const specificationsController = require('../controllers/specifications.controller');
const specifications = express();

specifications.get('/', specificationsController.get);
specifications.get('/:id', specificationsController.detail);
specifications.post('/', validateDataspecifications, specificationsController.add);
specifications.patch('/:id', specificationsController.edit);
specifications.delete('/:id', specificationsController.remove);

module.exports = specifications;  