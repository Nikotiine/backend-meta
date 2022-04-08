const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { productsCategories } = require("./productsCategories");
const products = database.define("products", {
  name: { type: DataTypes.STRING },
});
products.belongsTo(productsCategories, {
  foreignKey: "categoryCode",
  targetKey: "code",
});
module.exports = { products };
