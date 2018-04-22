'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      width: {
        type: Sequelize.INTEGER
      },
      height: {
        type: Sequelize.INTEGER
      },
      scale: {
    	defaultValue: 'original',
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      sourceType: {
    	defaultValue: 'URL',
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};