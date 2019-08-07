const express = require('express');
const branches = express.Router();
const controller = require('../controllers/Branches.controller')


branches.get('/branch/listBranch', controller.list);

branches.delete('/branch/deleteBranch/:id', controller.delete);

branches.put('/branch/updateBranch/:id', controller.update);

branches.post('/branch/createBranch', controller.create);

// Branches.get('/branch/searchBranch/:id', controller.search);

branches.get('/branch/search', controller.searchByName);

module.exports = branches;