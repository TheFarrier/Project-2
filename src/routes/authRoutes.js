const express = require('express');
const passport = require('passport');
const db = require('../../models');

const authRouter = express.Router();

module.exports = function router() {
  authRouter.route('/register')
    .get((req, res) => {
      if (req.user) {
        return res.redirect('/game');
      }
      return res.render('register');
    })
    .post((req, res) => {
      db.User.create({
        password: req.body.password,
        username: req.body.username,
      }).then(() => {
        req.login(req.body.username, () => {
          res.redirect('/game');
        });
      });
    });
  authRouter.route('/logout')
    .get((req, res) => {
      req.logout();
      res.redirect('signin');
    });
  authRouter.route('/signin')
    .get((req, res) => {
      if (req.user) {
        return res.redirect('/game');
      }
      return res.render('signin');
    })
    .post((req, res) => {
      passport.authenticate('local', (err, user, info) => {
        switch (info.message) {
          case ('Invaild username.'):
            res.status(401);
            console.log(info.message);
            res.render('signin', { username: req.body.username, usernameErr: info.message });
            break;
          case ('Invalid password.'):
            res.status(401);
            console.log(info.message);
            res.render('signin', { username: req.body.username, passwordErr: info.message });
            break;
          case ('Validated.'):
            req.login(user.username, () => res.redirect('/game'));
            break;
          default:
            res.redirect('/auth/signin');
            break;
        }
      })(req, res);
    });

  return authRouter;
};
