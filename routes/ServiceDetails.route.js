const express = require('express');
const serviceDetails = express.Router();
const controller = require('../controllers/ServiceDetails.controller');

serviceDetails.get('/serviceDetails/list', controller.listServiceDetails);
serviceDetails.get('/serviceDetails/list/:serviceid', controller.findServiceDetails);
serviceDetails.post('/serviceDetails/create', controller.createServiceDetails);
serviceDetails.put('/serviceDetails/update/:serviceDetailsID', controller.updateServiceDetails);
serviceDetails.delete('/serviceDetails/delete/:serviceDetailsID', controller.deleteServiceDetails);

module.exports = serviceDetails;