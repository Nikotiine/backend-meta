const createError = require("http-errors");

function isAdmin(req, res, next) {
  if (req.user?.account?.admin == true) {
    req.editor = true;
    next();
    return;
  } else {
    next(createError(403, "You are not an admin"));
    return;
  }
}

module.exports = { isAdmin };
