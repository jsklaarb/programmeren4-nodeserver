
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Person = require('./domain/Person');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

let persons = [];

  // Get on Root
app.get('/', (req, res) => {
  res.send();
});

  // Get on /api/person
app.get('/api/person', (req, res, next) => {
  for(let i = 0; i < persons.length; i++) {
    console.log(persons[i]);
  }
  
  res.status(200).send();
});

  // Post on /api/person
app.post('/api/person', (req, res, next) => {
  const person = new Person(req.body[0], req.body[1]);
  persons.push(person);
  
  res.status(200).send(person);
});

  // Handle not found
app.use('*', (req, res, next) => {
  console.log('Request recieved, method: ' + req.method + ' on url: ' + req.baseUrl);
  
  const error = {
    error: 'Endpoint does not exist',
    url: req.baseUrl
  }
  
  res.status(404).json(error).end();
});

  // Errorhandling op next(errorWaarde)
app.use((err, req, res, next) => {
  console.log('Error on final handling: ' + err);
  
  const error = {
    error: 'Server error'
  }
  
  res.status(500).json(error).end();
  
});

app.listen(port, () => {
  console.log('Server draait op poort: ' + port);
});