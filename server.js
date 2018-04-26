const express = require('express');
const morgan = require('morgan');
const Person = require('./domain/Person');
const bodyparser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(bodyparser.json());

let personlist = [];

app.use('*', (req, res, next) => {
	let httpmethod = req.method;
	let requesturl = req.baseUrl;
  
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl);
	
  next();
});

app.get('/api/person', (req, res, next) => {
	res.status(200).json(personlist).end();
});

app.get('/api/person/:id', (req, res, next) => {
	const id = req.params.id;

  // als id geldig is in de personlist: stuur person terug
	if(id >= 0 && id < personlist.length){
		res.status(200).json(personlist[id]).end();
	} else { // als id niet geldig is: error
		const error = {
			error: 'ID does not exist (index out of bounds)'
		}
		next(error);
	}
});

app.post('/api/person', (req, res, next) => {
	console.log(req.body);

	const firstname = req.body.firstname;
	const lastname = req.body.lastname;
	const person = new Person(firstname, lastname);
  
	personlist.push(person);

	res.status(200).json(person).end();
});

  // Wanneer de gevraagde endpoint niet gevonden is komen we hier.
app.use('*', (req, res, next) => {
	let httpmethod = req.method;
	let requesturl = req.baseUrl;
  
	console.log('We received a ' + httpmethod + ' request on url ' + requesturl);

	const error = {
		error: 'Endpoint does not exist',
		url: requesturl
	}
  
	next(error);
});

  // Als er een next(info) werd aangeroepen komen we hier
app.use((err, req, res, next) => {
	console.log('Final error handler: an error occurred');
	console.log(err);

	res.status(500).json(err).end();
});

app.listen(port, () => {
	console.log('Server is running on port ' + port);
});
