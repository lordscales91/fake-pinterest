'use strict';
var utils = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
    id: {
		allowNull: false,
        autoIncrement: true,
        primaryKey: true,
		type: DataTypes.INTEGER,
		get() {
			return utils.formatId(this.getDataValue('id'));
		}
	},
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.TEXT,
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
  Board.associate = function(models) {
    Board.belongsTo(models.User, {
    	foreignKey: {
    		allowNull: false
    	}
    });
  };
  return Board;
};