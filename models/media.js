'use strict';
module.exports = (sequelize, DataTypes) => {
  var media = sequelize.define('media', {
    photoAddress: DataTypes.TEXT
  }, {});
  media.associate = function(models) {
    media.belongsTo(models.blog, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
    });
  };
  return media;
};