const express = require("express");

const router = express.Router();
const {
  getInfoUsers,
  countAllAuthorised,
} = require("../controllers/publicController");
const { sendContactForm } = require("../controllers/nodemailerControllers");
router.get("/praticiens", (req, res) => {
  getInfoUsers().then((info) => {
    res.send(info);
  });
});
router.get("/count", (req, res) => {
  countAllAuthorised().then((count) => {
    res.send(count);
  });
});
router.post("/contact", (req, res) => {
  sendContactForm(req.body)
    .then((reponse) => {
      res.send(reponse);
    })
    .catch((err) => {
      console.log(err);
    });
});
//-------------------------export
module.exports = router;
