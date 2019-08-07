const express = require('express');
const serviceDetails = express.Router();
const controller = require('../controllers/ServiceDetails.controller');

serviceDetails.get('/service/listServiceDetails', controller.listServiceDetails);
serviceDetails.get('/service/listServiceDetails/:serviceid', controller.findServiceDetails);
serviceDetails.post('/service/createServiceDetails', controller.createServiceDetails);
serviceDetails.put('/service/updateServiceDetails/:serviceDetailsID', controller.updateServiceDetails);
serviceDetails.delete('/service/deleteServiceDetails/:serviceDetailsID', controller.deleteServiceDetails);

module.exports = serviceDetails;