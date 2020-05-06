function searchState()
{
    socket.on('startGame', (data) => {

        console.log('started game!');
        $('#gameWindow').empty();
        $('#gameWindow').append(data.html);
        $('#search-box').submit((event) => {searchGif(event)})
        $('.announcer-text').text(data.question)
    });

    function searchGif(event)
    {
        
     event.preventDefault();
    const selectionBtn = $("img.image"); // The selection box from after the search
    const gifContainer = $("#gif-container");
    gifContainer.empty();
    const gifKeyword = $("input.searchInput");
    const queryURL = `http://api.giphy.com/v1/gifs/search?q=${gifKeyword.val().trim()}&api_key=PgqiZ72BDLSFVrW4QL7p7F3gUgiXSbLo`;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then((response) => {
      const randomArray = [];
      // pushes 5 random numbers between 0 and 24 to an array
      while (randomArray.length < 5) {
        const x = Math.floor(Math.random() * 25);
        if (!randomArray.includes(x)) {
          randomArray.push(x);
        }
      }
      for (let i = 0; i < 5; i += 1) {
        const newGif = $("<img>").addClass("image");
        const gifUrl = response.data[randomArray[i]].images.fixed_height.url;
        newGif.attr("src", gifUrl) ;
        newGif.on("click", selectGif);
        gifContainer.append(newGif);
      }
      function selectGif() {
        url = $(this).attr("src")
        let name = $.ajax({ url: ,
            method: "GET"}).then( (result) => {
        })

        socket.emit('gifSelected');
      };
    });
        
    };
}
