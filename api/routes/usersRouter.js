const express = require("express");
const router = express.Router();
const { sendError } = require("./utils");

const {
  newUser,
  accessAllAccount,
  destroyAccount,
  editUser,
  countAllUsers,
  accountUser,
  saveAvatar,
} = require("../controllers/userControllers");
const { sendNewsletter } = require("../controllers/nodemailerControllers");
const { isAdmin } = require("./middlewares");
// -----------------------------------------------route for *****admin***** USER----------------------------------
router.post("/new", isAdmin, (req, res) => {
  //console.log(req.body);
  // console.log(req);
  newUser(req.body)
    .then((userAccount) => {
      res.send(userAccount);
    })
    .catch((err) => {
      console.log(err);
      sendError(err, res);
    });
});
router.post("/new/avatar", isAdmin, (req, res) => {
  saveAvatar(req.files.avatar, req.body.userId).then((toto) => {
    console.log(toto);
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
router.post("/newsletter", isAdmin, (req, res) => {
  sendNewsletter(req.body)
    .then((newsletter) => {
      res.send(newsletter);
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route loggin user----------------------------------

router.get("/me", (req, res) => {
  accountUser(req.user.account.id)
    .then((accountIsValidate) => {
      res.send(accountIsValidate);
    })
    .catch((err) => console.log(err));
});
// -----------------------------------------------route edit user---------------------------------------------
router.put("/edit", (req, res) => {
  editUser(req.body, req.user.account.id)
    .then((update) => {
      if (update) {
        accountUser(req.user.account.id).then((account) => {
          console.log("envoie acc");
          res.send({ data: "update sucess" });
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
