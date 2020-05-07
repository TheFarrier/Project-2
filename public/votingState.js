function votingState(){
    console.log('content hit');
    socket.on('gameStateVote', (data) => {
        $('#gameWindow').empty();
        $('#gameWindow').append(data.html);
        let gifs = data.gifs;
        console.log(data);
        gifs.forEach((content) => {
            let newDiv = `<div class="votingGif"><img src=${content.gif} data=${content.username}></div>`
            $(this).click((event) => {
                console.log($(event.target.id).attr('data'));
            })
            $('#gif-container').append(newDiv);
        })
    });

    socket.on('timer', (data) => {
        $('.time').text(data);
    })
}