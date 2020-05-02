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

  app.get('/register', (req, res) => {
    res.render('register');
  });

  app.get('/vote', (req, res) => {
    res.render('vote');
  });
};
// eslint-disable-next-line no-unused-expressions
