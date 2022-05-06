const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");

const productsPrices = database.define("productsPrice", {
  prixUnitaire: { type: DataTypes.FLOAT },
  quantitySmall: { type: DataTypes.INTEGER },
  quantityBig: { type: DataTypes.INTEGER },
});
// productsPrices.create({
//   prixUnitaire: 1,
//   quantityBig: 20,
//   quantitySmall: 5,
// });
module.exports = { productsPrices };
