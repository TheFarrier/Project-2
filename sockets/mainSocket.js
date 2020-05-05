function mainSocket(io) {
  io.on('connection', (socket) => {
    console.log('client has connected!');
    console.log(socket.request.session);
    if (socket.request.session.passport) {
      const player = socket.request.session.passport;
      socket.join('lobby', () => {
        io.to('lobby').emit('playerListener', { text: `${player.user} has joined te lobby!` });
      });
    }
    else {
      socket.emit('redirect', { url: 'http://localhost:3000/auth/logout' });
    }
  });
}

module.exports = mainSocket;