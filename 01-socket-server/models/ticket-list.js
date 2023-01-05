const Ticket = require('./ticket');

const LAST_TICKETS_ASSIGNED = 13;

class TicketList {
  constructor() {
    this.lastNumber = 0;

    this.pendings = [];
    this.assigned = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get lastTicketsAssigned() {
    return this.assigned.slice(0, LAST_TICKETS_ASSIGNED);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendings.push(newTicket);
    return newTicket;
  }

  assignedTicket(agent, desk) {
    if (!this.pendings.length) return;

    const nextTicket = this.pendings.shift();

    nextTicket.agent = agent;
    nextTicket.desk = desk;

    this.assigned.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
