'use strict';
var utils = require('../../utils');

module.exports = (sequelize, DataTypes) => {
  var Board = sequelize.define('Board', {
		name: {
			allowNull: false,
			type:DataTypes.STRING,
			set(val) {
				this.setDataValue('name', val);
				if(val) {
					this.setDataValue('machine_name', encodeURIComponent(val.toLowerCase().replace(' ', '-')));
				}
			}
		},
		machine_name: {
			type: DataTypes.STRING
		},
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
		Board.hasMany(models.Pin, {as: 'pins'})
		Board.belongsToMany(models.Image, {
			through: {
				model: models.ImageRelation,
				unique: false,
				scope: { owner_type: 'board' }
			},
			foreignKey: 'owner_id',
    	constraints: false
		});
	};
	
	// Used to sanitize user input by defining the allowed fields to include
	Board.inputFields = ['id', 'name', 'url', 'description', 'creator', 'created_at', 'counts', 'image'];

  return Board;
};