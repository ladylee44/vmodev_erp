const express = require('express');
const branches = express.Router();
const controller = require('./../controllers/Branches.controllers');

branches.get('/branch', controller.branchList);
branches.post('/branch', controller.createBranch);

module.exports = branches;