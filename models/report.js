'use strict';
module.exports = (sequelize, DataTypes) => {
  var report = sequelize.define('report', {
    message: DataTypes.TEXT
  }, {});
  report.associate = function(models) {
  	report.belongsTo(models.user, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  	report.belongsTo(models.blog, {
      foreignKey: 'blogId',
      onDelete: 'CASCADE',
    });
  };
  return report;
};