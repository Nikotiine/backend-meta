const { orders } = require("../../models/orders");
const { products } = require("../../models/products");
const { productInOrder } = require("../../models/productsInOrder");
const { sendOrder } = require("./nodemailerControllers");
async function newOrder(data, user) {
  //console.log(data);
  const order = await orders
    .create({
      userId: data.userId,
      payment: data.payment,
      shipTo: data.shipTo,
      total: data.total,
    })
    .then((create) => {
      const listOfProducts = data.products.map((prod) => {
        return {
          name: prod.name,
          smallBox: prod.smallBox,
          bigBox: prod.bigBox,
          categoryCode: prod.categoryCode,
          productId: prod.id,
          commandeId: create.dataValues.id,
        };
      });
      // console.log(create);
      // console.log("list" + listOfProducts);

      productInOrder.bulkCreate(listOfProducts);
      const orderIsMailled = sendOrder(create, listOfProducts, user);
      return orderIsMailled;
    });
  return order;
}
async function findUserOrders(id) {
  return await orders.findAll({
    where: { userId: id },
  });
}
async function findUserOrder(id) {
  console.log(id);
  return await orders.findByPk(id, {
    include: [
      {
        model: productInOrder,
      },
    ],
  });
}
module.exports = { newOrder, findUserOrders, findUserOrder };
