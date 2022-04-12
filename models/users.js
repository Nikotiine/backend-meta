const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { usersAdresse } = require("./userAdresse");
const { newsletter } = require("./newsletter");

const user = database.define("users", {
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN },
  publicAuthorisation: { type: DataTypes.BOOLEAN },
  avatar: { type: DataTypes.BLOB("long") },
});
user.hasOne(newsletter, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
newsletter.belongsTo(user);
user.hasOne(usersAdresse, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
usersAdresse.belongsTo(user);
module.exports = { user };
