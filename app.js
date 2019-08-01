const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// const conn = require('./configdb/configdb');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const branchRoute = require('./routes/Branches.route');
app.use('/erp', branchRoute);

const cardRoute = require('./routes/Cards.route');
app.use('/erp', cardRoute);

const contractRoute = require('./routes/Contracts.route');
app.use('/erp', contractRoute);

const customerRoute = require('./routes/Customers.route');
app.use('/erp', customerRoute);

const employeeRoute = require('./routes/Employees.route');
app.use('/erp', employeeRoute);

const timekeeping = require('./routes/TimeKeeping.route');
app.use('/erp', timekeeping);

module.exports = app;