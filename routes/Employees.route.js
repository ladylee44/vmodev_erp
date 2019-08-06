const express = require('express');
const employees = express.Router();
const controller = require('./../controllers/Employees.controllers');

employees.get('/employee/listEmployee', controller.employeeList);
employees.get('/employee/listEmployee/:employeeid', controller.findEmployee);
employees.get('/employee/searchEmployee', controller.searchEmployeesByName);
employees.post('/employee/createEmployee', controller.addEmployee);
employees.put('/employee/updateEmployee/:employeeid', controller.updateEmployee);
employees.delete('/employee/deleteEmployee/:employeeid', controller.deleteEmployee);

module.exports = employees;