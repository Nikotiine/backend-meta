const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");

const products = database.define("products", {
  name: { type: DataTypes.STRING },
  categorie: { type: DataTypes.INTEGER },
});
module.exports = { products };
