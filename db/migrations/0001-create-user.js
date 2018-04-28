'use strict';
module.exports ={
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
  		allowNull: false,
  		unique: true,
  		type: Sequelize.STRING 
  	  },
  	  email: {
		allowNull: false,
		unique: true,
		type: Sequelize.STRING
	  },
	  password: {
		allowNull: false,
		type: Sequelize.STRING
	  },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      bio: {
    	allowNull: false,
      	defaultValue: '',
    	type: Sequelize.STRING
      },
      created_at: {
          allowNull: false,
          type: Sequelize.DATE
        },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }  
};