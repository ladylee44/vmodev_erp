const express = require('express');
const contract = express.Router();
const controller = require('../controllers/Contracts.controller');

contract.get('/contract/:contractid', controller.findContractByID);
contract.post('/contract/createContract', controller.createContract);
contract.put('/contract/updateContract/:contractid', controller.updateContract);
contract.delete('/contract/deleteContract/:contractid', controller.deleteContract);

module.exports = contract;