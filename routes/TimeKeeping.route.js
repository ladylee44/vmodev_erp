const express = require('express');
const timekeeping = express.Router();
const controller = require('./../controllers/TimeKeeping.controller');

timekeeping.get('/timekeeping/list', controller.list);

timekeeping.get('/timekeeping/listByMonth', controller.listByDate);

timekeeping.get('/timekeeping/listByDay', controller.listByDay);
// timekeeping.get('/employee/:employeeid', controller.findEmployee);
// timekeeping.post('/employee', controller.addEmployee);
// timekeeping.put('/employee/:employeeid', controller.updateEmployee);
// timekeeping.delete('/employee/:employeeid', controller.deleteEmployee);

module.exports = timekeeping;
