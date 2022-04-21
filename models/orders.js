const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { productInOrder } = require("./productsInOrder");
const orders = database.define("commande", {
  payment: { type: DataTypes.STRING },
  shipTo: { type: DataTypes.STRING },
  total: { type: DataTypes.STRING },
});

orders.hasMany(productInOrder);
productInOrder.belongsTo(orders, {});
module.exports = { orders };
