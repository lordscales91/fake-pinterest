'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('FollowRelations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      follower_id: {
        type: Sequelize.INTEGER
      },
      followable_id: {
        type: Sequelize.INTEGER
      },
      target_type: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('FollowRelations');
  }
};