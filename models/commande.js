const { DataTypes } = require("sequelize");
const { database } = require("./config");

const commandes = database.define("commande", {
  numero: { type: DataTypes.INTEGER },
});
module.exports = { commandes };
