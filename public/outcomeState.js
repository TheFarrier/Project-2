function outcomeState(){
    console.log('content hit');
    socket.on('gameStateOutcome', (data) => {
        $('#gameWindow').empty();
        $('#gameWindow').append(data.html);
    });

    socket.on('timer', (data) => {
        $('.time').text(data);
    })
}