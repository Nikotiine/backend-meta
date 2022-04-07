require("dotenv").config();
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./generator");

function authenticateToken(req, res, next) {
  console.log("debut auth");
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.status(401).send("pas de token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      console.log(token);
      console.log("err de token");
      next(createError(401, "err de token"));
      return;
    }
    console.log("ok valide");
    req.user = user;
    next();
  });
}

async function verifyToken(req) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return false;
  }

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return false;
    }
    // TODO : check en bdd que le user a toujours les droit et qu'il existe toujours
    console.log("verify ok");
    delete user.iat;
    delete user.exp;
    const refreshedToken = generateAccessToken(user);
    return {
      accessToken: refreshedToken,
    };
  });
}

module.exports = { verifyToken, authenticateToken };
