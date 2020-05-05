/* eslint-disable linebreak-style */
const gameWindow = $(".game-window");
const Handlebars = require("handlebars");

function renderSearch() {
  gameWindow.empty();
  gameWindow.load("html/search.html");
}

function renderSelect() {
  gameWindow.empty();
  /* This function should precompile the handlebars page so we can insert it 
  into the game window with .load() */
  function getTemplate() {
    return $.get("./html/vote.handlebars").then((src) => Handlebars.compile(src));
  }
  gameWindow.load(getTemplate());
}

function nextround() {
  $.put("/api/newround", {
    name: req.user
  })
    .then((data) => {
      console.log("Cleared votes and selection");
    })
    .catch(handleError);
}

/* Code for searching/selecting/voting moved to script tags 
in their respective html files. We could keep them as their
own .js files like before if we don't want to do that. */

renderSelect();
