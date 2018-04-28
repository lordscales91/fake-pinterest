'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ImageRelations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      image_id: {
    	allowNull: false,
      	type: Sequelize.INTEGER,
      	references: {
      		model: 'Images',
      		key: 'id'
      	}
      },
      owner_type: {
    	allowNull: false,
        type: Sequelize.STRING
      },
      owner_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ImageRelations');
  }
};