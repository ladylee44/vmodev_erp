const express = require('express');
const services_customers = express.Router();
const controller = require('../controllers/ServicesCustomers.controller')

services_customers.get('/servicesCustomers/:serviceCustomerID', controller.findSerCus);
services_customers.post('/servicesCustomers', controller.createSerCus);
services_customers.put('/servicesCustomers/:serviceCustomerID', controller.updateSerCus);
services_customers.delete('/servicesCustomers/:serviceCustomerID', controller.deleteSerCus);


module.exports = services_customers;