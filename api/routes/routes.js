const express = require("express");
const router = express.Router();
const {
  newUser,
  logginUser,
  accountUser,
} = require("../controllers/userControllers");
const { verifyToken, authenticateToken } = require("../token/authenticate");

// -----------------------------------------------route new user----------------------------------
router.post("/user/new", (req, res) => {
  newUser(req.body)
    .then((userAccount) => {
      res.send(userAccount);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
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
      console.log(accountIsValidate);
      res.send(accountIsValidate);
    })
    .catch((err) => console.log(err));
});

// -----------------------------------------------route refresh token----------------------------------
router.post("refreshToken", (req, res) => {
  verifyToken(req)
    .then((refreshToken) => res.send(refreshToken))
    .catch((err) => console.log(err));
});
// Exporting router
module.exports = router;
