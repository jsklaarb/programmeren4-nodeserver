class Person {
  // this._firstname
  // this._lastname
  
  constructor(firstname, lastname) {
    this._firstname = firstname;
    this._lastname = lastname;
  }
  
  getFirstname() {
    return this._firstname;
  }
}

module.exports = Person;