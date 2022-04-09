const express = require("express");
const router = express.Router();
const { isAdmin } = require("./middlewares");
const {
  allProducts,
  newProduct,
  editProduct,
  countProducts,
} = require("../controllers/productsControllers");
const { allCatergory } = require("../controllers/categoriesContollers");
router.get("/all", (req, res) => {
  allProducts()
    .then((all) => res.send(all))
    .catch((err) => console.log(err));
});
router.get("/category", (req, res) => {
  allCatergory()
    .then((all) => res.send(all))
    .catch((err) => console.log(err));
});
router.get("/count", (req, res) => {
  countProducts()
    .then((count) => {
      res.send(count);
    })
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
