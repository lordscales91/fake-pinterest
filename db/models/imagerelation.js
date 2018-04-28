'use strict';
module.exports = (sequelize, DataTypes) => {
  var ImageRelation = sequelize.define('ImageRelation', {
    image_id: DataTypes.INTEGER,
    owner_type: DataTypes.STRING,
    owner_id: DataTypes.INTEGER
  }, { underscored: true, timestamps: false });
  ImageRelation.associate = function(models) {
    // associations can be defined here
  };
  return ImageRelation;
};