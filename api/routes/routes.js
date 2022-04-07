const express = require("express");
const {
  newProduct,
  allProducts,
  editProduct,
} = require("../controllers/productsControllers");
const router = express.Router();
const {
  newUser,
  logginUser,
  accountUser,
  countAllUsers,
  editUser,
  accessAllAccount,
  destroyAccount,
} = require("../controllers/userControllers");

const { verifyToken, authenticateToken } = require("../token/authenticate");

// -----------------------------------------------route for *****admin***** USER----------------------------------
router.post("/user/new", authenticateToken, (req, res) => {
  if (req.user.account.admin) {
    newUser(req.body)
      .then((userAccount) => {
        res.send(userAccount);
      })
      .catch((err) => {
        console.log(err);
        res.send(err);
      });
  } else res.sendStatus(403);
});
router.get("/user/all", authenticateToken, (req, res) => {
  if (req.user.account.admin) {
    accessAllAccount()
      .then((allAccount) => {
        res.send(allAccount);
      })
      .catch((err) => console.log(err));
  } else res.sendStatus(403);
});
router.delete("/user/delete", authenticateToken, (req, res) => {
  if (req.user.account.admin) {
    console.log(req.body);
    destroyAccount(req.body)
      .then((isDestroy) => {
        res.send({ data: isDestroy });
      })
      .catch((err) => console.log(err));
  } else res.sendStatus(403);
});
// -----------------------------------------------route loggin user----------------------------------
router.post("/user/loggin", (req, res) => {
  logginUser(req.body)
    .then((validAccount) => {
      res.send(validAccount);
    })
    .catch((err) => res.send(err));
});
router.get("/user", authenticateToken, (req, res) => {
  accountUser(req.user.account.id)
    .then((accountIsValidate) => {
      res.send(accountIsValidate);
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route edit user---------------------------------------------
router.put("/user/edit", authenticateToken, (req, res) => {
  editUser(req.body, req.user.account.id)
    .then((update) => {
      if (update) {
        accountUser(req.user.account.id).then((account) => {
          res.send(account);
        });
      } else res.sendStatus(400);
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route find and count users----------------------------------
router.get("/user/count", (req, res) => {
  countAllUsers()
    .then((count) => {
      res.send(count);
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route Products----------------------------------
router.get("/product/all", authenticateToken, (req, res) => {
  allProducts()
    .then((all) => res.send(all))
    .catch((err) => console.log(err));
});

// -----------------------------------------------route Products******ADMIN--------------------------
router.post("/product/new", authenticateToken, (req, res) => {
  if (req.user.account.admin) {
    newProduct(req.body).then((product) => res.send(product));
  } else res.sendStatus(403);
});
router.put("/product/edit", authenticateToken, (req, res) => {
  if (req.user.account.admin) {
    editProduct(req.body)
      .then((update) => {
        res.send(update);
      })
      .catch((err) => console.log(err));
  } else res.sendStatus(403);
});
// -----------------------------------------------route refresh token----------------------------------
router.post("refreshToken", (req, res) => {
  verifyToken(req)
    .then((refreshToken) => res.send(refreshToken))
    .catch((err) => console.log(err));
});
// Exporting router
module.exports = router;
