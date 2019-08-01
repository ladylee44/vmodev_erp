const express = require('express');
const serviceDetails = express.Router();
const controller = require('../controllers/ServiceDetails.controller');

serviceDetails.get('/service_details/:serviceid', controller.findServiceDetails);
serviceDetails.post('/service_details/', controller.createServiceDetails);
serviceDetails.put('/service_details/:servicedetails_id', controller.updateServiceDetails);
serviceDetails.delete('/service_details/:servicedetails_id', controller.deleteServiceDetails);

module.exports = serviceDetails;