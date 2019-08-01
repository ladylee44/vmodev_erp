const express = require('express');
const card = express.Router();
const controller = require('../controllers/Cards.controller');

card.get('/listCard', controller.list);

card.get('/searchCard/:id', controller.search);

card.post('/createCard', controller.create);

card.put('/updateCard/:id', controller.update)

card.delete('/deleteCard/:id', controller.delete)

module.exports = card;