const express = require('express');
const timekeeping = express.Router();
const controller = require('../controllers/TimeKeepings.controller');

timekeeping.get('/timekeeping/list', controller.list);

timekeeping.get('/timekeeping/listByDate', controller.listByDate);

timekeeping.get('/timekeeping/listByDay', controller.listByDay);

timekeeping.get('/timekeeping/listMonth', controller.listMonth);

module.exports = timekeeping;
