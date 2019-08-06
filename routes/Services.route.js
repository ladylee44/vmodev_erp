const express = require('express');
const services = express.Router();
const controller = require('./../controllers/Services.controller')

services.get('/service/list', controller.listServices);
services.get('/service/listService/:serviceid', controller.findService);
services.get('/service/search', controller.searchServicesByName);
services.post('/service/create', controller.addService);
services.put('/service/update/:serviceid', controller.updateService);
services.delete('/service/delete/:serviceid', controller.deleteService);

module.exports = services;