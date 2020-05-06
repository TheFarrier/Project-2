/* eslint-disable no-undef */
const socket = io('http://localhost:3000', { timeout: 2000 });

socket.on('playerListener', (players) => {
    console.log(players);
});
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
    });
});


//    $('.announcer-text').animate({ transition: '.3s', opacity: 0 });
//$('.announcer-gif').animate({ transition: '.3s', opacity: 0 });
//$('.ready-up').animate({ transition: '.0s', opacity: 0 });
//socket.emit('playerReady', {ready: true});