const express = require('express');
const itemsReturnedController = require('../controllers/items_returned.controller');
const items_returned = express();

items_returned.get('/', itemsReturnedController.findAll);
items_returned.get('/:id', itemsReturnedController.findOne);
items_returned.post('/', itemsReturnedController.create);
items_returned.patch('/:id', itemsReturnedController.edit);
items_returned.delete('/:id', itemsReturnedController.remove);

module.exports = items_returned;