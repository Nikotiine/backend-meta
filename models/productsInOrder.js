//const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { DataTypes } = require("sequelize");
const productInOrder = database.define("productInOrders", {
  name: { type: DataTypes.STRING },
  productId: { type: DataTypes.INTEGER },
  categoryCode: { type: DataTypes.INTEGER },
  smallBox: { type: DataTypes.INTEGER },
  bigBox: { type: DataTypes.INTEGER },
  totalS: { type: DataTypes.INTEGER },
  totalB: { type: DataTypes.INTEGER },
});
module.exports = { productInOrder };
