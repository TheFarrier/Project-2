module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gamesWon: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, { freezeTableName: true });
  return Users;
};
