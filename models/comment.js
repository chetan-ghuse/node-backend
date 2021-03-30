'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    comment: DataTypes.TEXT
  }, {});
  comment.associate = function(models) {
  	comment.belongsTo(models.blog, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
    });
  	comment.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return comment;
};