const express = require('express');
const personController = require('../contollers/person-controller');
const routes = express.Router();

routes.get('/person', personController.getAllPersons);

routes.get('/person/:id', personController.getPersonById);

routes.post('/person', personController.createPerson);

routes.delete('/person/:id', personController.deletePersonById);

module.exports = routes;