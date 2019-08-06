const express = require('express');
const card = express.Router();
const controller = require('../controllers/Cards.controller');

card.get('/card/listCard', controller.list);

card.get('/card/search/:id', controller.search);

card.post('/card/createCard', controller.create);

card.put('/card/updateCard/:id', controller.update)

card.delete('/card/deleteCard/:id', controller.delete)

module.exports = card;