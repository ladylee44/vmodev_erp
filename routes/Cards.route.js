const express = require('express');
const card = express.Router();
const controller = require('../controllers/Cards.controller');

card.get('/card/list', controller.list);

card.get('/card/search/:id', controller.search);

card.post('/card/create', controller.create);

card.put('/card/update/:id', controller.update)

card.delete('/card/delete/:id', controller.delete)

module.exports = card;