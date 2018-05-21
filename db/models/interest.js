'use strict';
module.exports = (sequelize, DataTypes) => {
  var Interest = sequelize.define('Interest', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, { timestamps: false, underscored: true });
  Interest.associate = function(models) {
    // associations can be defined here
  };
  return Interest;
};