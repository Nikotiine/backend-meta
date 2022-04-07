class StatusCodeError extends Error {
  message;
  status;
  constructor(message, status) {
    super();
    this.message = message;
    this.code = status ? status : 400;
  }
}

function sendError(error, res) {
  if (typeof error == "string") {
    error = new StatusCodeError(error);
  }
  res.status(error.code ?? 400);
  res.json(error);
}

module.exports = { sendError, StatusCodeError };
