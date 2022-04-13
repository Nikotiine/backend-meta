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
async function countProducts() {
  const { count, raws } = await products.findAndCountAll();

  return { count };
}
async function editProduct(product) {
  console.log(product);
  return await products.update(
    {
      name: product.name,
      categoryCode: product.code,
    },
    {
      where: {
        id: product.id,
      },
    }
  );
}
module.exports = { newProduct, allProducts, editProduct, countProducts };
