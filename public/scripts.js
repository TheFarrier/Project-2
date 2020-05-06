/* eslint-disable no-undef */
const socket = io('http://localhost:3000', { timeout: 2000 });

socket.on('playerListener', (players) => {
    console.log(players);
});
socket.on('redirect', (data) => {
//  socket.disconnect();
 // window.location.href = data.url;
});


