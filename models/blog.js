'use strict';
module.exports = (sequelize, DataTypes) => {
  var blog = sequelize.define('blog', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    content: DataTypes.TEXT,
    visible: DataTypes.BOOLEAN
  }, {});
  blog.associate = function(models) {
    blog.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    blog.hasMany(models.comment, {
      foreignKey: 'blogId',
      as: 'commentItems',
    });
    blog.hasMany(models.media, {
      foreignKey: 'blogId',
      as: 'mediaItems',
    });
    blog.hasMany(models.like, {
      foreignKey: 'blogId',
      as: 'likeItems',
    });
    blog.hasMany(models.report, {
      foreignKey: 'blogId',
      as: 'reportItems',
    });
  };
  return blog;
};