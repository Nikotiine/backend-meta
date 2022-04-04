const { Sequelize } = require("sequelize");
const config = require("./config.json");

// configuration choice
const CONFIG_NAME = "dev";
const currentConfiguration = config[CONFIG_NAME];

const database = new Sequelize(
  currentConfiguration.database,
  currentConfiguration.username,
  currentConfiguration.password,
  {
    host: currentConfiguration.host,
    dialect: currentConfiguration.dialect,
  }
);

module.exports = { database };
