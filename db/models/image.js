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
      source_type: {
    	defaultValue: 'URL',
        type: DataTypes.STRING
      }
  }, { underscored: true, timestamps: false });
  Image.associate = function(models) {
    Image.belongsToMany(models.User, {
    	through: {
    		model: models.ImageRelation,
    		unique: false
    	},
    	foreignKey: 'image_id'
    });
  };
  return Image;
};