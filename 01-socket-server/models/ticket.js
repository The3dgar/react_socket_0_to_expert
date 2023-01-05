const { v4: uuid } = require('uuid');

class Ticket {
  constructor(number) {
    this.id = uuid();
    this.number = number;
    this.desk = null;
    this.agent = null;
  }
}

module.exports = Ticket;
