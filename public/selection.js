const gifSearch = $("form.search"); // The form that we submit when searching
const gifKeyword = $("searchInput"); // The word in teh form's text box
const selectionForm = $("form.selection"); // The selection box from after the search

gifSearch.on("submit", (event) => {
  event.preventDefault();
  const queryURL = `https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC?q=${gifKeyword.val().trim()}`;

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
    console.log(randomArray);
    for (let i = 0; i < 5; i += 1) {
      const aEl = document.createElement("img");

      // get an image for each number in the random array
      aEl.src = response.data[randomArray[i]].images.fixed_height.url;

      // add this element to the body
      document.body.append(aEl); // change the body to a container we can append it to
    }
  });
});

selectionForm.on("submit", (event) => {
  event.preventDefault();
  const selectionData = {
    playerName: req.user, // check to make sure this is the logged in users name
    selection: $("Whatever the gif is called") // get a handle on specific gif selected.
  };

  sendSelection(selectionData);
});

function sendSelection(selectionData) {
  $.put("/api/selection", {
    name: selectionData.playerName,
    selection: selectionData.selection
  })
    .then((data) => {
      console.log("selection submited to database");
    })
    .catch(handleError);
}
