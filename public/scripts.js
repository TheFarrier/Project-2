/* eslint-disable no-undef */
const socket = io('http://localhost:3000', { timeout: 2000 });
socket.on('playerListener', (data) => {
    console.log(data.text);
    document.querySelector('.player').innerHTML = data.text;
});
socket.on('redirect', (data) =>{
  window.location.href = data.url;
});

