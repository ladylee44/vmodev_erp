const express = require('express');
const services = express.Router();
const controller = require('./../controllers/Services.controller')

services.get('/services', controller.listServices);
services.get('/services/findByID/:serviceid', controller.findService);
services.get('/services/searchServices', controller.searchServicesByName);
services.post('/services', controller.addService);
services.put('/services/:serviceid', controller.updateService);
services.delete('/services/:serviceid', controller.deleteService);

module.exports = services;