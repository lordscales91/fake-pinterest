'use strict';
var utils = require('../../utils');

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
    	  username: 'john_doe',
    	  email: 'john.doe@mail.com',
    	  password: utils.encodePassword('abc123.'),
    	  first_name: 'John',
    	  last_name: 'Doe',
    	  created_at: new Date()
      	},
      	{
      	  username: 'mary_doe',
      	  email: 'mary.doe@mail.com',
  	      password: utils.encodePassword('abc123.'),
      	  first_name: 'Mary',
      	  last_name: 'Doe',
    	  created_at: new Date()
      	},
      	{
    	  username: 'john_rambo',
    	  email: 'john.ramboe@mail.com',
  	      password: utils.encodePassword('abc123.'),
    	  first_name: 'John',
    	  last_name: 'Rambo',
    	  created_at: new Date()
    	}
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {}
};
