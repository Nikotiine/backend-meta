const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
const { newsletter } = require("./newsletter");
const user = database.define("users", {
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  admin: { type: DataTypes.BOOLEAN },
  avatar: { type: DataTypes.BLOB("long") },
});
user.hasOne(newsletter);
newsletter.belongsTo(user);
module.exports = { user };
