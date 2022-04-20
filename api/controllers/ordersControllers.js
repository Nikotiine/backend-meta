const { orders } = require("../../models/orders");
const { products } = require("../../models/products");
const { productInOrder } = require("../../models/productsInOrder");

async function newOrder(data) {
  await orders
    .create({
      userId: data.userId,
      payment: data.payment,
      shipTo: data.shipTo,
    })
    .then((create) => {
      const listOfProducts = data.products.map((prod) => {
        return {
          smallBox: prod.smallBox,
          bigBox: prod.bigBox,
          categoryCode: prod.categoryCode,
          productId: prod.id,
          commandeId: create.dataValues.id,
        };
      });

      productInOrder.bulkCreate(listOfProducts);
    });
  return { data: "Commande Validé" };
}

module.exports = { newOrder };
