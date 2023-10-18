const express = require('express');
const validateDataitems = require('../../helpers/items.validate');
const itemsController = require('../controllers/items.controller');
const items = express();

items.get('/', itemsController.get);
items.get('/:id', itemsController.detail);
items.post('/', validateDataitems, itemsController.add);
items.put('/:id', itemsController.edit);
items.delete('/:id', itemsController.remove);


module.exports = items;