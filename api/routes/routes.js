const express = require("express");
const router = express.Router();
const { newUser } = require("../controllers/userControllers");
// Handling request using router
// router.get("/login", (req, res, next) => {
//   res.send("This is the homepage request");
// });
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
router.post("/user/loggin", (req, res) => {
  logginUser(req.body)
    .then((validAccount) => {
      res.send(validAccount);
    })
    .catch((err) => res.send(err));
});
// Exporting router
module.exports = router;
