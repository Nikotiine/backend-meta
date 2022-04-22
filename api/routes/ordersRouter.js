const express = require("express");
const { orders } = require("../../models/orders");
const { isAdmin } = require("./middlewares");
const router = express.Router();
const {
  newOrder,
  findUserOrders,
  findUserOrder,
  findAllOrders,
  orderIsShipped,
} = require("../controllers/ordersControllers");

router.post("/newOrder", (req, res) => {
  newOrder(req.body, req.user.account).then((order) => {
    if (order.response) {
      res.send({ data: "commande validé" });
    } else res.send({ data: "une erreur est arrivé" });
  });
});

router.get("/myOrders", (req, res) => {
  findUserOrders(req.user.account.id).then((userOrders) => {
    res.send(userOrders);
  });
});
router.get("/one/:id", (req, res) => {
  console.log("one");
  findUserOrder(req.params.id).then((order) => {
    res.send(order);
  });
});
router.get("/all", isAdmin, (req, res) => {
  findAllOrders().then((allOrders) => {
    res.send(allOrders);
  });
});
router.put("/shipping/:id", (req, res) => {
  orderIsShipped(req.params.id, req.body).then((isShipped) => {
    console.log(isShipped);
    if (isShipped[0] === 1) {
      res.send("Commande expedié");
    } else {
      res.send("Commande Deja expedié");
    }
  });
});
module.exports = router;
