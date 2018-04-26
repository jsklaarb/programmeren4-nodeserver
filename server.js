<<<<<<< HEAD

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
=======
//
// server.js
//
const express = require('express')
const morgan = require('morgan')
const Person = require('./domain/Person')
const bodyparser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyparser.json())

let personlist = []

app.use('*', (req, res, next) => {
	let httpmethod = req.method
	let requesturl = req.baseUrl
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl)
	next()
})

app.get('/api/person', (req, res, next) => {
	console.log('get was called')

	res.status(200).json(personlist).end()
})

app.get('/api/person/:id', (req, res, next) => {
	console.log('get was called')
	const id = req.params.id

	if(id >= 0 && id < personlist.length){
		// als id geldig is in de personlist: stuur person terug
		res.status(200).json(personlist[id]).end()
	} else {
		// als id niet geldig is: error
		const error = {
			error: 'ID does not exist (index out of bounds)'
		}
		next(error)
	}
})

app.post('/api/person', (req, res, next) => {
	console.log('post was called')
	console.log(req.body)

	const firstname = req.body.firstname
	const lastname = req.body.lastname
	const person = new Person(firstname, lastname)
	personlist.push(person)

	res.status(200).json(person).end()
})

// Wanneer de gevraagde endpoint niet gevonden is komen we hier.
app.use('*', (req, res, next) => {
	let httpmethod = req.method
	let requesturl = req.baseUrl
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl)

	const error = {
		error: 'Endpoint does not exist',
		url: requesturl
	}
	// res.status(404).json(error).end()
	next(error)
})

// Als er een next(info) werd aangeroepen komen we hier
app.use((err, req, res, next) => {
	console.log('Final error handler: an error occurred')
	console.log(err)

	res.status(500).json(err).end()
})

app.listen(port, () => {
	console.log('Server is running on port ' + port)
})
>>>>>>> a5fde88e0b9027d7d7119fd8e946e26828f7b65f
