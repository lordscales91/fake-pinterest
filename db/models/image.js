'use strict';
module.exports = (sequelize, DataTypes) => {
  var Image = sequelize.define('Image', {
	  width: {
        type: DataTypes.INTEGER
      },
      height: {
        type: DataTypes.INTEGER
      },
      scale: {
    	defaultValue: 'original',
        type: DataTypes.STRING
      },
      source: {
        type: DataTypes.STRING
      },
      sourceType: {
    	defaultValue: 'URL',
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
  }, {});
  Image.associate = function(models) {
    // associations can be defined here
  };
  return Image;
};