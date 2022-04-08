const { products } = require("../../models/products");

async function newProduct(data) {
  const [item, created] = await products.findOrCreate({
    where: {
      name: data.name,
    },
    defaults: {
      categoryCode: data.code,
    },
  });
  if (created) {
    return item;
  } else return false;
}
async function allProducts() {
  return await products.findAll();
}
async function editProduct(product) {
  return await products.update(
    {
      name: product.name,
      categorie: product.categorie,
    },
    {
      where: {
        id: product.id,
      },
    }
  );
}
module.exports = { newProduct, allProducts, editProduct };
