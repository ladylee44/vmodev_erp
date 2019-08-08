const express = require('express');
const timekeeping = express.Router();
const controller = require('./../controllers/TimeKeeping.controller');

timekeeping.get('/timekeeping/list', controller.list);

timekeeping.get('/timekeeping/listByDate', controller.listByDate);

timekeeping.get('/timekeeping/listByDay', controller.listByDay);

timekeeping.get('/timekeeping/listByMonth', controller.listByMonth);

module.exports = timekeeping;
