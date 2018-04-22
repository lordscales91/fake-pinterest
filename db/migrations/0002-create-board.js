'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Boards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      user_id: {
    	allowNull: false,
    	type: Sequelize.INTEGER,
    	references: {
    		model: 'Users',
    		key: 'id'
    	}
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Boards');
  }
};