const { orders } = require("../../models/orders");
const { products } = require("../../models/products");
const { productInOrder } = require("../../models/productsInOrder");
const { user } = require("../../models/users");
const { sendOrder } = require("./nodemailerControllers");
async function newOrder(data, user) {
  console.log(data);
  const order = await orders
    .create({
      userId: data.userId,
      payment: data.payment,
      shipTo: data.shipTo,
      total: data.total,
      inProgress: data.inProgress,
      shipped: false,
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
          totalS: prod.totalS,
          totalB: prod.totalB,
        };
      });

      productInOrder.bulkCreate(listOfProducts);
      const orderIsMailled = sendOrder(create, listOfProducts, user);
      return orderIsMailled;
    });
  return order;
}
async function findUserOrders(id) {
  return await orders.findAll({
    where: { userId: id },
    include: [{ model: user }],
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
async function findAllOrders() {
  return await orders.findAll({
    include: [{ model: user }],
  });
}
async function orderIsShipped(id, status) {
  return await orders.update(
    {
      inProgress: status.inProgress,
      shipped: status.shipped,
    },
    {
      where: {
        id: id,
      },
    }
  );
}
module.exports = {
  newOrder,
  findUserOrders,
  findUserOrder,
  findAllOrders,
  orderIsShipped,
};
