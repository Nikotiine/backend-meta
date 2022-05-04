const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");

const avatar = database.define("avatar", {
  avatar: { type: DataTypes.BLOB("long") },
});

module.exports = { avatar };
