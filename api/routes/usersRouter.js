const express = require("express");
const router = express.Router();
const {
  newUser,
  accessAllAccount,
  destroyAccount,
  editUser,
  countAllUsers,
  accountUser,
} = require("../controllers/userControllers");
const { isAdmin } = require("./middlewares");
// -----------------------------------------------route for *****admin***** USER----------------------------------
router.post("/new", isAdmin, (req, res) => {
  newUser(req.body)
    .then((userAccount) => {
      res.send(userAccount);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});
router.get("/all", isAdmin, (req, res) => {
  accessAllAccount()
    .then((allAccount) => {
      res.send(allAccount);
    })
    .catch((err) => console.log(err));
});
router.delete("/delete", isAdmin, (req, res) => {
  destroyAccount(req.body)
    .then((isDestroy) => {
      res.send({ data: isDestroy });
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route loggin user----------------------------------

// router.get("/me", (req, res) => {
//   accountUser(req.user.account.id)
//     .then((accountIsValidate) => {
//       res.send(accountIsValidate);
//     })
//     .catch((err) => console.log(err));
// });
// -----------------------------------------------route edit user---------------------------------------------
router.put("/edit", (req, res) => {
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
router.get("/count", (req, res) => {
  countAllUsers()
    .then((count) => {
      res.send(count);
    })
    .catch((err) => console.log(err));
});

module.exports = router;
