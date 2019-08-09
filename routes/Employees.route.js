const express = require('express');
const employees = express.Router();
const controller = require('./../controllers/Employees.controllers');

employees.get('/employee/list', controller.employeeList);
employees.get('/employee/list/:employeeid', controller.findEmployee);
employees.get('/employee/search/:name', controller.searchEmployeesByName); 
employees.get('/employee/pagination/:page', controller.pagination);
employees.post('/employee/create', controller.addEmployee);
employees.put('/employee/update/:employeeid', controller.updateEmployee);
employees.delete('/employee/delete/:employeeid', controller.deleteEmployee);

module.exports = employees;