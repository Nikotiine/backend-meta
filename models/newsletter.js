const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
//const { user } = require("./users");
const newsletter = database.define("newsletter", {
  email: { type: DataTypes.STRING },
  registered: { type: DataTypes.BOOLEAN },
});

//newsletter.belongsTo(user);
module.exports = { newsletter };
