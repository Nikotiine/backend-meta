const { database } = require("./config_db");
const { user } = require("../models/users");
const { products } = require("../models/products");
//const { productsCategories } = require("../models/productsCategories");
(async () => {
  try {
    await database.authenticate();
    await user.sync({ alter: true });
    // await productsCategories.sync({ alter: true });
    await products.sync({ alter: true });
    console.log("Connection mariadb ok.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = { database };
