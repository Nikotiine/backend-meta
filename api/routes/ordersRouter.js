const express = require("express");
const { orders } = require("../../models/orders");

const router = express.Router();
const {
  newOrder,
  findUserOrders,
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

module.exports = router;
