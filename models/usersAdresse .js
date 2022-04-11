const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { user } = require("./users");
const usersAdresse = database.define("usersAdresse ", {
  adressePerso: { type: DataTypes.STRING },
  geoLocPerso: { type: DataTypes.GEOMETRY },
  adressePro: { type: DataTypes.STRING },
  geoLocPro: { type: DataTypes.GEOMETRY },
});
usersAdresse.belongsTo(user);
module.exports = { usersAdresse };
