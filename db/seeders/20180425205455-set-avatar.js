'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('ImageRelations', [{
          image_id: 1,
          owner_type: 'user',
          owner_id: 1
        },
        {
          image_id: 1,
          owner_type: 'user',
          owner_id: 2
        }
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
