const { DataTypes } = require("sequelize");
const { database } = require("./config");

const listOfProducts = database.define("listOfProducts", {
  name: { type: DataTypes.STRING },
  typeOf: { type: DataTypes.STRING },
});
module.exports = { listOfProducts };
