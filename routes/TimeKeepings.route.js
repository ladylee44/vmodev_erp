const express = require('express');
const timekeeping = express.Router();
const controller = require('./../controllers/TimeKeepings.controller');

timekeeping.get('/timekeeping/list', controller.list);

// timekeeping.get('/timekeeping/listByMonth', controller.listByDate);

timekeeping.get('/timekeeping/listByDay', controller.listByDay);

timekeeping.get('/timekeeping/listByMonth', controller.listByMonth);

module.exports = timekeeping;
