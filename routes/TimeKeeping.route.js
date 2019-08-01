const express = require('express');
const timekeeping = express.Router();
const controller = require('./../controllers/TimeKeeping.controller');

timekeeping.get('/listTimekeeping', controller.list);
// timekeeping.get('/employee/:employeeid', controller.findEmployee);
// timekeeping.post('/employee', controller.addEmployee);
// timekeeping.put('/employee/:employeeid', controller.updateEmployee);
// timekeeping.delete('/employee/:employeeid', controller.deleteEmployee);

module.exports = timekeeping;
