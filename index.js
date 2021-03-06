"use strict";
const express = require("express");
const app = express();
const cors = require("cors");
const createError = require("http-errors");
const routes = require("./api/routes/");
const fileupload = require("express-fileupload");
app.use(fileupload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("./config/launch_db");
//--------------------routes
app.use("/", routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  const response = {
    status: err.status,
    message: err.message,
  };
  if (res.statusCode == 500) {
    response.stack = err.stack;
  }
  res.send(response);
});
//-----------------fin de l'index.js

app.listen(3000, () => {
  console.log("serveur ok sur localhost:3000");
});
