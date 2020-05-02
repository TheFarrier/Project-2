const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
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
  });

  User.prototype.validatePass = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  User.addHook('beforeCreate', (user) => {
    // eslint-disable-next-line no-param-reassign
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10, null));
  });
  return User;
};
