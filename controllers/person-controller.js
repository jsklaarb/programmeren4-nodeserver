const Person = require('../domain/Person');

let personlist = [];

module.exports = {
  getAllPersons: (req, res, next) => {
    res.status(200).json(personlist).end();
  },
  getPersonById = (req, res, next) => {
    const id = req.params.id;

    // als id geldig is in de personlist: stuur person terug
    if(id >= 0 && id < personlist.length){
      res.status(200).json(personlist[id]).end();
    } else { // als id niet geldig is: error
      const error = {
        error: 'ID does not exist (index out of bounds)'
      };
      next(error);
    }
  },
  createPerson: (req, res, next) => {
    console.log(req.body);

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const person = new Person(firstname, lastname);
    
    personlist.push(person);

    res.status(200).json(person).end();
  },
  deletePersonById: (req, res, next) => {
    const id = req.params.id;

    // als id geldig is in de personlist
    // if(id >= 0 && id < personlist.length){
      personlist.splice(id, 1);
      
      res.status(200).end();
    // } else { // als id niet geldig is: error
      // const error = {
        // error: 'ID does not exist (index out of bounds)'
      // };
      // next(error);
    // }
  }
};


