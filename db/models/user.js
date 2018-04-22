'use strict';
var utils = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
	id: {
		allowNull: false,
        autoIncrement: true,
        primaryKey: true,
		type: DataTypes.INTEGER,
		get() {
			return utils.formatId(this.getDataValue('id'));
		}
	},
	username: {
		allowNull: false,
		type: DataTypes.STRING 
	},
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.STRING,
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
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};