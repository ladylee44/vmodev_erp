const express = require('express');
const contract = express.Router();
const controller = require('../controllers/Contracts.controller');

contract.get('/contract/list', controller.listContract);
contract.get('/contract/list/:contractid', controller.findContract);
contract.post('/contract/create', controller.createContract);
contract.put('/contract/update/:contractid', controller.updateContract);
contract.delete('/contract/delete/:contractid', controller.deleteContract);

module.exports = contract;