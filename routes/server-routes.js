const bcrypt = require('bcrypt');
// eslint-disable-next-line import/no-unresolved
const db = require('../models');

const saltRounds = 10;

// eslint-disable-next-line func-names
module.exports = function (app) {
  app.get('/', (req, res) => {
    res.send('Hi!');
  });

  app.get('/login', (req, res) => {
    res.render('login');
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

  app.get('/register', (req, res) => {
    res.render('register');
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
};
// eslint-disable-next-line no-unused-expressions
