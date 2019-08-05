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

const timekeepingRoute = require('./routes/TimeKeeping.route');
app.use('/erp', timekeepingRoute);

const serviceDetailsRoute = require('./routes/ServiceDetails.route');
app.use('/erp/', serviceDetailsRoute);

const service_customer = require('./routes/Services_Customers.route');
app.use('/erp/', service_customer);

const serviceRoute = require('./routes/Services.route');
app.use('/erp', serviceRoute);

module.exports = app;