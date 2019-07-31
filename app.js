const express = require('express');
const app = express();
const bodyParser = require("body-parser");

// const conn = require('./configdb/configdb');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const branchRoute = require('./routes/Branches.route');
app.use('/', branchRoute);

const employeeRoute = require('./routes/Employees.route');
app.use('/', employeeRoute);

const contractRoute = require('./routes/Contracts.route');
app.use('/', contractRoute);

module.exports = app;