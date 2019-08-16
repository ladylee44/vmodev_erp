const express = require('express');
const branches = express.Router();
const controller = require('../controllers/Branches.controller')


branches.get('/branch/list', controller.list);

branches.delete('/branch/delete/:id', controller.delete);

branches.put('/branch/update/:id', controller.update);

branches.post('/branch/create', controller.create);

branches.get('/branch/searchByID/:id', controller.search);

branches.get('/branch/search/:name', controller.searchByName);

branches.get('/branch/pagination/:page', controller.pagination);

module.exports = branches;