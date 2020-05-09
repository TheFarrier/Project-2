/* eslint-disable no-undef */
const socket = io('https://gif-lash.herokuapp.com/', { timeout: 2000 });

socket.on('playerListener', (data) => {
   $('#messages').empty();
   data.playersList.forEach((player) => {
    let li = ` <li><div class="user-name">Server: <span class="message-text">${player} has joined!</span></div></li>`
    $('#messages').append(li);
   });
    
});
socket.on('messageToClients', (data) =>{
    let li = ` <li><div class="user-name">${data.username}: <span class="message-text">${data.text}</span></div></li>`
    $('#messages').append(li);
})
$('.message-form').submit(formSubmission);
function formSubmission(event)
{
    event.preventDefault();
    console.log('sub')
    const newMessage = $('#user-message').val();
    console.log(newMessage);
    socket.emit('newMessageToServer', {text: newMessage});
}

socket.on('stateListener', (data) => {
    $('#gameWindow').empty();
    $('#gameWindow').append(data.html);
    $('.ready-up').css('display', 'none')
    $('.ready-up').css('opacity', '0')
    $('.announcer-text').css('opacity', '0')
    $('.announcer-gif').css('opacity', '0')

    $('.announcer-text').animate({ transition: '.1s', opacity: 1 });
    $('.announcer-gif').animate({ transition: '.1s', opacity: 1 });
    $('.announcer-text').text('Hold on a sec... rounding up players!');
    $('.announcer-gif').attr('src', ' https://media.giphy.com/media/LOZ5ELmGUUiC4/giphy.gif');
    $('.announcer-gif').attr('alt', 'gathering');
    })
socket.on('redirect', (data) => {
  socket.disconnect();
  window.location.href = data.url;
});

socket.on('playersLoaded', () => {
    console.log('players loaded')
    $('.ready-up').css('display', 'block')
    $('.ready-up').animate({transition: '2s', opacity: 1})
    $('.ready-up').one('click', (e)=> {
        socket.emit('playerReady', {ready: true});
        searchState();
        votingState();
    });
});

