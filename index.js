"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./api/routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("./config/launch_db");
//--------------------routes
app.use("/", routes);

//-----------------fin de l'index.js

app.listen(3000, () => {
  console.log("serveur ok sur localhost:3000");
});
