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
		unique: true,
		type: DataTypes.STRING 
	},
	email: {
		allowNull: false,
		unique: true,
		type: DataTypes.STRING,
		validate: { isEmail: true }
	},
	password: {
		allowNull: false,
		type: DataTypes.STRING
	},
	password_input: {
		allowNull: false,
		type: DataTypes.VIRTUAL,
		set(val) {
			this.setDataValue('password_input', val);
			this.setDataValue('password', utils.encodePassword(val));
		},
		validate: { 
			isLongEnough(val) {
				if(val.length < 5) {
					throw new Error('The password must be at least 5 characters long');
				}
			} 
		}
	},
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: {
    	allowNull: false,
    	defaultValue: '',
    	type: DataTypes.STRING
    },
    created_at: {
    	allowNull: false,
    	type: DataTypes.DATE,
    	get() {
    		return utils.formatDate(this.getDataValue('created_at'));
    	}
    }
  }, 
  // Model options
  { 
	underscored: true,
	timestamps: true,
	updatedAt: false,
	createdAt: 'created_at',
	defaultScope: {
		attributes: ['first_name', 'last_name', 'id', 'username']
	}
  });
  User.associate = function(models) {
    User.belongsToMany(models.Image, {
    	through: {
    		model: models.ImageRelation,
    		unique: false,
    		scope: { owner_type: 'user' }
    	},
    	foreignKey: 'owner_id',
    	constraints: false
    });
  };
  
  // Used to sanitize user input by defining the allowed fields to include
  User.inputFields = ['id', 'username', 'first_name', 'last_name', 'bio', 'created_at', 'counts', 'image'];
  
  return User;
};