const express = require('express');
const services_customers = express.Router();
const controller = require('./../controllers/Services_Customers.controller')

services_customers.get('/services_customers/:service_customer_id', controller.findSerCus);
services_customers.post('/services_customers', controller.createSerCus);
services_customers.put('/services_customers/:service_customer_id', controller.updateSerCus);


module.exports = services_customers;