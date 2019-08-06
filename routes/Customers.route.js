const express = require('express');
const customer = express.Router();
const controller = require('../controllers/Customers.controller');

customer.get('/customer/listCustomer', controller.list);

customer.delete('/customer/deleteCustomer/:id', controller.delete);

// customer.get('/customer/searchCustomer/:id', controller.search);

customer.get('/customer/search', controller.searchByName)

customer.post('/customer/createCustomer', controller.create);

customer.put('/customer/updateCustomer/:id', controller.update);

customer.get('/customer/pagination/:page', controller.pagination);


module.exports = customer