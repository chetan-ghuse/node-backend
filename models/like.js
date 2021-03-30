'use strict';
module.exports = (sequelize, DataTypes) => {
  var like = sequelize.define('like', {
  }, {});
  like.associate = function(models) {
  	like.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  	like.belongsTo(models.blog, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
    });
  };
  return like;
};