const { products } = require("../../models/products");

async function newProduct(data) {
  const [item, created] = await products.findOrCreate({
    where: {
      name: data.name,
    },
    default: {
      categorie: data.categorie,
    },
  });
  if (created) {
    return item;
  } else return false;
}
module.exports = { newProduct };
