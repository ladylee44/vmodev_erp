const express = require('express');
const Branches = express.Router();
const controller = require('../controllers/Branches.controller')

Branches.get('/listBranch', controller.list);

Branches.delete('/deleteBranch/:id', controller.delete);

Branches.put('/updateBranch/:id', controller.update);

Branches.post('/createBranch', controller.create);

Branches.get('/searchBranch/:id', controller.search);

module.exports = Branches;