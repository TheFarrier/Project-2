const handlebars = require('handlebars');
const gameQuestions = require('./gameQuestions.js');
const fs = require('fs');

const readyHTML = fs.readFileSync("./views/game-partials/ready.handlebars", "utf8")
const searchHTML = fs.readFileSync("./views/game-partials/search.handlebars", "utf8")
const votingHTML = fs.readFileSync("./views/game-partials/vote.handlebars", "utf8")
const outcomeHTML = fs.readFileSync("./views/game-partials/outcome.handlebars", "utf8")

function mainSocket(io) {
  let players = [];
  let readyCheck = [];
  let votingGifs = [];
  let questionHistory = [];
  let maxPlayers = 3;

  let searchTime = 10;
  let voteTime = 30;

  let searchTimer;
  let voteTimer;
  let outcomeTimer;
  


  
  io.on('connection', (socket) => {

    if (socket.request.session.passport) {
      let playerTag = socket.request.session.passport.user;
      console.log(`${playerTag} has connected`)
      io.clients((err, clients) => {
        if (clients.length <= maxPlayers){
          if(players.indexOf(playerTag) === -1) {
            players.push(playerTag);
          }
          socket.join('lobby', () => {
            console.log(`${playerTag} has joined lobby`)
            io.to('lobby').emit('playerListener', {playersList: players});
            io.to('lobby').emit('stateListener', {html: readyHTML});
            if(players.length === maxPlayers){
              io.of('/').in('lobby').emit('playersLoaded');
            }
          });
        }
      });

    }
    else {
      socket.emit('redirect', { url: 'http://localhost:3000/auth/logout' });
    }
    
    socket.on('newMessageToServer', (msg) => {
      const fullMsg = {
          username: socket.request.session.passport.user,
          text: msg.text, 
      }
      io.of('/').to('lobby').emit('messageToClients', fullMsg)
    });

    socket.on('gifSelected', (url) => {
      let playerSelection = {
        username: socket.request.session.passport.user,
        gif: url
      };
      if(votingGifs.findIndex(i => i.username === playerSelection.username) === -1)
      {
        votingGifs.push(playerSelection);
      }
      else{
        votingGifs.forEach((player) => {
          if(player.username === playerSelection.username)
          {
            player.gif = url
          }
        });
      }
    });

    function countDownSearch()
    {
      searchTime -= 1;
      io.of('/').in('lobby').emit('timer', searchTime);

      if(searchTime === 0)
      {
        io.of('/').in('lobby').emit('gameStateVote', {gifs: votingGifs, html: votingHTML});
        clearInterval(searchTimer);
        voteTimer = setInterval(countDownVote, 1000)
      }
    }

    function countDownVote()
    {
      voteTime -=1;
      io.of('/').in('lobby').emit('timer', voteTime);

      if(voteTime === 0)
      {
        clearInterval(voteTimer);
      }
    }

    socket.on('playerReady', (data) => {
      readyCheck.push(data.ready);
      if(readyCheck.length === maxPlayers){
       let questionText = generateQuestion();
       io.of('/').in('lobby').emit('gameStateSearch', {question: questionText, html: searchHTML});
        searchTimer = setInterval(countDownSearch, 1000);
      }
    });

  });
  
  

  function generateQuestion()
  {
    console.log(gameQuestions.length);
    let generatedIndex = Math.floor(Math.random() * gameQuestions.length)
    let generatedQuestion = gameQuestions[generatedIndex];
    if(questionHistory.indexOf(generatedQuestion) === -1){
      questionHistory.push(generatedQuestion)
      return generatedQuestion.question;
    }
    else if(questionHistory.length != gameQuestions.length){
      generateQuestion();
    } 
    else
    {
      return 'Out of questions!'
    }
  }
}




module.exports = mainSocket;

//game states that we need
