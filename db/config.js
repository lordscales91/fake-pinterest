const Sequelize = require('sequelize');

module.exports = {
  development: {
    username: "root",
    password: null,
    database: "fake_pinterest",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: Sequelize.Op
  },
  local_production: {
    username: "postgres",
    password: "abc123.",
    database: "fake_pinterest",
    host: "127.0.0.1",
    dialect: "postgres",
    operatorsAliases: Sequelize.Op
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: Sequelize.Op
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    operatorsAliases: Sequelize.Op
  }
};
