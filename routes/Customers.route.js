const express = require('express');
const customer = express.Router();
const controller = require('../controllers/Customers.controller');

customer.get('/customer/list', controller.list);

customer.delete('/customer/delete/:id', controller.delete);

customer.get('/customer/list/:id', controller.search);

customer.get('/customer/search/:name', controller.searchByName)

customer.post('/customer/create', controller.create);

customer.put('/customer/update/:id', controller.update);

customer.get('/customer/pagination/:page', controller.pagination);


module.exports = customer