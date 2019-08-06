const express = require('express');
const Branches = express.Router();
const controller = require('../controllers/Branches.controller')

Branches.get('/branch/listBranch', controller.list);

Branches.delete('/branch/deleteBranch/:id', controller.delete);

Branches.put('/branch/updateBranch/:id', controller.update);

Branches.post('/branch/createBranch', controller.create);

// Branches.get('/branch/searchBranch/:id', controller.search);

Branches.get('/branch/search', controller.searchByName);

module.exports = Branches;