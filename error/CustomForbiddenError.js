class CustomForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "CustomForbiddenError";
    this.statusCode = 403;
  }
}

module.exports = CustomForbiddenError;
