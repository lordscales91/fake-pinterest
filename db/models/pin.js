'use strict';
var utils = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  var Pin = sequelize.define('Pin', {
    link: DataTypes.STRING,
    note: {
      allowNull: false,
      type:DataTypes.STRING
    },
    color: DataTypes.STRING,
    created_at: {
    	allowNull: false,
    	type: DataTypes.DATE,
    	get() {
    		return utils.formatDate(this.getDataValue('created_at'));
    	}
    }
  }, 
  {
	  underscored: true,
	  timestamps: true,
	  updatedAt: false,
	  createdAt: 'created_at'
  });
  Pin.associate = function(models) {
    Pin.belongsTo(models.Board, {
      foreignKey: {
        allowNull: false
      }
    })
  };
  return Pin;
};