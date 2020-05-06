const handlebars = require('handlebars');
const fs = require('fs');

function mainSocket(io) {
let players = [];
io.on('connection', (socket) => {
    if (socket.request.session.passport) {
      let playerTag = socket.request.session.passport.user;
      if(players.indexOf(playerTag) === -1){
       players.push(playerTag);
      }
      socket.join('lobby', () => {
        io.to('lobby').emit('playerListener', players);
      });
    }
    else {
      socket.emit('redirect', { url: 'http://localhost:3000/auth/logout' });
    }
  });


}

module.exports = mainSocket;

//game states that we need
