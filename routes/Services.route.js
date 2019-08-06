const express = require('express');
const services = express.Router();
const controller = require('./../controllers/Services.controller')

services.get('/service/listService', controller.listServices);
// services.get('/service/listService/:serviceid', controller.findService);
services.get('/service/search', controller.searchServicesByName);
services.post('/service/createService', controller.addService);
services.put('/service/updateService/:serviceid', controller.updateService);
services.delete('/service/deleteService/:serviceid', controller.deleteService);

module.exports = services;