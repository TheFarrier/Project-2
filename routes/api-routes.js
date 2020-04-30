var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  // Update database with selected gif when user submits a selection
  app.put("/api/selection", function (req, res) {
    db.Players.update({ selection: req.body.selection }, {
      where: { name: req.body.name }
    })
  });
}

