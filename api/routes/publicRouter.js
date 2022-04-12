const express = require("express");

const router = express.Router();
const {
  getInfoUsers,
  countAllAuthorised,
} = require("../controllers/publicController");

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

//-------------------------export
module.exports = router;
