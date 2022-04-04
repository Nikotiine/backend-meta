const { DataTypes } = require("sequelize");
const { database } = require("./config");

const products = database.define("products", {
  name: { type: DataTypes.STRING },
  typeOf: { type: DataTypes.STRING },
});
module.exports = { products };
