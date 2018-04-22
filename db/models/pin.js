'use strict';
var utils = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  var Pin = sequelize.define('Pin', {
    id: {
    	allowNull: false,
        autoIncrement: true,
        primaryKey: true,
		type: DataTypes.INTEGER,
		get() {
			return utils.formatId(this.getDataValue('id'));
		}
    },
    link: DataTypes.STRING,
    url: DataTypes.STRING,
    note: DataTypes.STRING,
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
    // associations can be defined here
  };
  return Pin;
};