const express = require('express');
const items_borrowedController = require('../controllers/items_borrowed.controller');
const items_borrowed = express();

items_borrowed.get('/', items_borrowedController.findAll);
items_borrowed.get('/:id', items_borrowedController.findOne);
items_borrowed.post('/', items_borrowedController.create);
items_borrowed.patch('/:id', items_borrowedController.edit);
items_borrowed.delete('/:id', items_borrowedController.remove);

module.exports = items_borrowed;