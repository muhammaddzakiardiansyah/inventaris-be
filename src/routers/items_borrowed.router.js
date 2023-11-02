const express = require('express');
const items_borrowedController = require('../controllers/items_borrowed.controller');
const items_borrowed = express();

items_borrowed.get('/', items_borrowedController.get);

module.exports = items_borrowed;