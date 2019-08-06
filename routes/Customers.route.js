const express = require('express');
const customer = express.Router();
const controller = require('../controllers/Customers.controller');

customer.get('/listCustomer', controller.list);

customer.delete('/deleteCustomer/:id', controller.delete);

customer.get('/searchCustomer/:id', controller.search);

customer.get('/searchCustomerByName', controller.searchByName)

customer.post('/createCustomer', controller.create);

customer.put('/updateCustomer/:id', controller.update);

customer.get('/pagination/:page', controller.pagination);


module.exports = customer