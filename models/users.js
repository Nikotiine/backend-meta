const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");

const user = database.define("users", {
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  adresse: { type: DataTypes.STRING },
  zipCode: { type: DataTypes.INTEGER },
  city: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN },
  avatar: { type: DataTypes.BLOB("long") },
});
module.exports = { user };
