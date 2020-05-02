const db = require("../../models");

module.exports = function(app) {

  // Update database with selected gif when user submits a selection
  app.put("/api/selection", (req, res) => {
    db.Players.update({ selection: req.body.selection }, {
      where: { name: req.user.name }
    });
  });

  app.put("/api/vote", (req, res) => {
    db.Players.update({ currentVotes: sequelize.literal("currentVotes + 1") }, {
      where: { name: req.body.name }
    });
  });

  app.put("/api/newround", (req, res) => {
    db.Players.update(
      {
        currentVotes: 0,
        selection: null
      }, {
        where: { name: req.body.name }
      }
    );
  });
};
