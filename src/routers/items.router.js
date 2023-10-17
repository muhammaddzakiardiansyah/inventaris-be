const express = require('express');
const validateDataitems = require('../../helpers/items.validate');
const itemsController = require('../controllers/items.controller');
const items = express();

items.get('/', itemsController.get);
items.post('/', validateDataitems, itemsController.add);


module.exports = items;