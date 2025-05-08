class CustomUnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "CustomUnauthorizedError";
    this.statusCode = 401;
  }
}

module.exports = CustomUnauthorizedError;
