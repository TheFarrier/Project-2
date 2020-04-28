module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3]
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
    gamesWon: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Users;
};
