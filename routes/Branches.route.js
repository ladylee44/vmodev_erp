const express = require('express');
const branches = express.Router();
const controller = require('../controllers/Branches.controller')

branches.get('/listBranch', controller.list);

branches.delete('/deleteBranch/:id', controller.delete);

branches.put('/updateBranch/:id', controller.update);

branches.post('/createBranch', controller.create);

branches.get('/searchBranch/:id', controller.search);

module.exports = branches;