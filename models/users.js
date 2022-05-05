const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { usersAdresse } = require("./userAdresse");
const { newsletter } = require("./newsletter");
const { orders } = require("./orders");
const { avatar } = require("./usersAvatars");
const user = database.define("users", {
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN },
  publicAuthorisation: { type: DataTypes.BOOLEAN },
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
user.hasMany(orders, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
orders.belongsTo(user);
user.hasOne(avatar, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
avatar.belongsTo(user);
module.exports = { user };
