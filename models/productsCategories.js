const { DataTypes } = require("sequelize");
const { database } = require("../config/config_db");
//const { products } = require("./products");
const productsCategories = database.define("productsCategories", {
  name: { type: DataTypes.STRING },
  code: { type: DataTypes.INTEGER, unique: true },
});
// productsCategories.bulkCreate([
//   { name: "hormones", code: 0 },
//   { name: "virus et bactéries ", code: 1 },
//   { name: "environnement", code: 2 },
//   { name: "complexes de remèdes", code: 3 },
//   { name: "allopathie", code: 4 },
//   { name: "organothérapie", code: 5 },
// ]);
// productsCategories.hasMany(products, {
//   onUpdate: "CASCADE",
//   onDelete: "CASCADE",
// });
module.exports = { productsCategories };
