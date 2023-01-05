const {
  userConnected,
  userDisconnected,
  getUsersOnline,
  saveMessage,
} = require('../controllers/socket.controller');
const { verifyTkn } = require('../helpers/token');
const BandList = require('./bandList');
const MarkerLists = require('./marker-list');
const TicketList = require('./ticket-list');

module.exports = class Sockets {
  constructor(io) {
    this.io = io;

    this.bandList = new BandList();
    this.ticketList = new TicketList();
    this.markerList = new MarkerLists();

    this.chatEvents();
  }

  bandEvents() {
    this.io.on('connection', (socket) => {
      console.log('user connected id: ', socket.id);

      // emitir al cliente todas las bandas actuales
      socket.emit('current-bands', this.bandList.getBands());

      // votar por la band
      socket.on('vote-band', (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('delete-band', (id) => {
        this.bandList.removeBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('rename-band', ({ id, name }) => {
        this.bandList.changeName(id, name);
        this.io.emit('current-bands', this.bandList.getBands());
      });

      socket.on('create-band', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }

  ticketEvents() {
    this.io.on('connection', (socket) => {
      console.log('user connected id: ', socket.id);

      socket.on('request-ticket', (data, callback) => {
        const newTicket = this.ticketList.createTicket();
        console.log('nuevo ticket', newTicket);
        callback(newTicket);
      });

      socket.on('attend-ticket', ({ agent, desk }, callback) => {
        const ticket = this.ticketList.assignedTicket(agent, desk);
        callback(ticket);

        this.io.emit('assigned-ticket', this.ticketList.lastTicketsAssigned);
      });
    });
  }

  markerEvents() {
    this.io.on('connection', (socket) => {
      console.log('user connected id: ', socket.id);

      // TODO: send active markers
      socket.emit('active-markers', this.markerList.actives);

      // TODO: new marker
      socket.on('new-marker', (marker) => {
        this.markerList.addMarker(marker);
        socket.broadcast.emit('new-marker', marker);
      });

      // TODO: update marker
      socket.on('update-marker', (marker) => {
        this.markerList.updateMarker(marker);
        socket.broadcast.emit('update-marker', marker);
      });
    });
  }

  chatEvents() {
    this.io.on('connection', async (socket) => {
      const tkn = socket.handshake.query['x-token'];
      if (!tkn) return socket.disconnect();

      let uid = null;

      // validar tkn y desconectar usuario
      try {
        const payload = verifyTkn(tkn);
        uid = payload.uid;
      } catch (error) {
        console.log('chatEvents tkn', error.toString());
        return socket.disconnect();
      }
      const user = await userConnected(uid);

      // emitir todos los usuarios activos
      this.io.emit('users-list', await getUsersOnline());

      // unir al usuario a una sala de socket.io
      socket.join(uid);

      // escuchar cuando el cliente manda un mensaje
      socket.on('message-sended', async (payload) => {
        const msg = await saveMessage(payload);
        this.io.to(payload.to).emit('message-sended', msg);
        this.io.to(payload.from).emit('message-sended', msg);
      });

      // disconnect
      // marcar en la db que el usuario se desconecto
      // emitir a todos los usuarios activos

      socket.on('disconnect', async () => {
        await userDisconnected(user);
        this.io.emit('users-list', await getUsersOnline());
        console.log('user disconnected', user.name);
      });
    });
  }
};
