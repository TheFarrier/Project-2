const handlebars = require('handlebars');
const gameQuestions = require('./gameQuestions.js');
const fs = require('fs');
   
const readyHTML = fs.readFileSync("./views/game-partials/ready.handlebars", "utf8")
const searchHTML = fs.readFileSync("./views/game-partials/search.handlebars", "utf8")

function mainSocket(io) {
  let players = [];
  let readyCheck = [];
  let questionHistory = [];
  let maxPlayers = 2;
  let gameTime = 300;

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
    
    function countDown()
    {
      gameTime -= 1;
    }

    socket.on('playerReady', (data) => {
      readyCheck.push(data.ready);
      if(readyCheck.length === maxPlayers){
       let questionText = generateQuestion();
       io.of('/').in('lobby').emit('startGame', {question: questionText, html: searchHTML});
        let gameTimer = setInterval(countDown, 1000);
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
