// server express
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //conectar a db
    dbConnection();

    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {
      cors: {
        origin: '*',
      },
      /** configs */
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(express.json());
    this.app.use(cors());

    // get from tickets
    this.app.get('/tickets', (_, res) => {
      const tickets = this.sockets.ticketList.lastTicketsAssigned;
      res.send(tickets);
    });

    this.app.use('/api/auth', require('../router/auth.router'));
    this.app.use('/api/message', require('../router/message.router'));
  }

  // socketsConfig() {
  //   new Sockets(this.io)
  // }

  listen() {
    this.middlewares();
    // this.socketsConfig();
    this.server.listen(this.port, () => {
      console.log(`server is running on port ${this.port}`);
    });
  }
}

module.exports = Server;
