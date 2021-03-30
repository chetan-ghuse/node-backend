'use strict';
module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    emailId: DataTypes.STRING,
    password: DataTypes.TEXT
  }, {});
  user.associate = function(models) {
      user.hasMany(models.blog, {
        foreignKey: 'userId',
        as: 'blogItems',
      });
      user.hasMany(models.comment, {
        foreignKey: 'userId',
        as: 'commentUserItems',
      });
      user.hasMany(models.like, {
        foreignKey: 'userId',
        as: 'likeItems',
      });
      user.hasMany(models.report, {
        foreignKey: 'userId',
        as: 'reportItems',
      });
  };
  return user;
};