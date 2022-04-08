const { productsCategories } = require("../../models/productsCategories");

async function allCatergory() {
  return await productsCategories.findAll();
}

module.exports = { allCatergory };
