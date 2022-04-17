const { database } = require("./config_db");
const { user } = require("../models/users");
const { newsletter } = require("../models/newsletter");
const { products } = require("../models/products");
const { usersAdresse } = require("../models/userAdresse");
const { productsPrices } = require("../models/productsPrices");
//const { productsCategories } = require("../models/productsCategories");
(async () => {
  try {
    await database.authenticate();
    await user.sync({ alter: true });
    await newsletter.sync({ alter: true });
    await usersAdresse.sync({ alter: true });
    await products.sync({ alter: true });
    await productsPrices.sync({ alter: true });
    console.log("Connection mariadb ok.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = { database };
