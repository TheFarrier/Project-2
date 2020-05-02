var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // Update database with selected gif when user submits a selection
  app.put("/api/selection", function (req, res) {
    db.Players.update({ selection: req.body.selection }, {
      where: { name: req.user.name }
    })
  });

  app.put("/api/vote", function (req, res) {
    db.Players.update({ currentVotes: sequelize.literal('currentVotes + 1') }, {
      where: { name: req.body.name }
    })
  });

  app.put('/api/newround', function (req, res) {
    db.Players.update(
      {
        currentVotes: 0,
        selection: null,
      }, {
      where: { name: req.body.name }
    })
  });

  app.post('/login', (req, res) => {
    const pass = req.body.password;

    db.Users.findAll({ where: { username: req.body.username }, raw: true }).then((res) => {
      console.log(res[0].password);
      bcrypt.compare(pass, res[0].password, (err, response) => {
        if (response === true) {
          // route to game page
        } else if (response !== true) {
          res.render('login');
        }
      });
    });
  });

  app.post('/register', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
      db.Users.create({
        username: req.body.username,
        password: hash,
      });
    });
    // redirect to next page I.E 'Lobby'
  });
}

