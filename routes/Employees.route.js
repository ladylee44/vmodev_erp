const express = require('express');
const employees = express.Router();
const controller = require('./../controllers/Employees.controllers');

employees.get('/employee', controller.employeeList);
employees.get('/employee/findByID/:employeeid', controller.findEmployee);
employees.get('/employee/searchEmployee', controller.searchEmployeesByName);
employees.post('/employee', controller.addEmployee);
employees.put('/employee/:employeeid', controller.updateEmployee);
employees.delete('/employee/:employeeid', controller.deleteEmployee);

module.exports = employees;