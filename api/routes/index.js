var express = require("express");

const router = express.Router();
const usersRouter = require("./usersRouter");
const ordersRouter = require("./ordersRouter");
const productsRouter = require("./productsRouter");
const publicRouter = require("./publicRouter");
const { authenticateToken, verifyToken } = require("../token/authenticate");
const { sendError } = require("./utils");

const { logginUser } = require("../controllers/userControllers");

router.post("/user/loggin", (req, res) => {
  logginUser(req.body)
    .then((validAccount) => {
      res.send(validAccount);
    })
    .catch((err) => {
      sendError(err, res);
    });
});
router.use("/public", publicRouter);
router.use("/user", authenticateToken, usersRouter);
router.use("/products", authenticateToken, productsRouter);
router.use("/orders", authenticateToken, ordersRouter);
router.post("/refreshToken", (req, res) => {
  verifyToken(req)
    .then((refreshToken) => res.send(refreshToken))
    .catch((err) => sendError(err, res));
});
module.exports = router;
