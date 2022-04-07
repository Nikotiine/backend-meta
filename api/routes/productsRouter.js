const express = require("express");
const router = express.Router();
const { isAdmin } = require("./middlewares");
const {
  allProducts,
  newProduct,
  editProduct,
} = require("../controllers/productsControllers");

router.get("/all", (req, res) => {
  allProducts()
    .then((all) => res.send(all))
    .catch((err) => console.log(err));
});

// -----------------------------------------------route Products******ADMIN--------------------------
router.post("/new", isAdmin, (req, res) => {
  newProduct(req.body).then((product) => res.send(product));
});
router.put("/edit", isAdmin, (req, res) => {
  editProduct(req.body)
    .then((update) => {
      res.send(update);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
