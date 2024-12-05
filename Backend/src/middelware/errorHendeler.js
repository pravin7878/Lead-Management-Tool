// errorHandler.js

const errorHandler = (err, req, res, next) => {
  // Default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Log the error (useful for debugging)
  console.error(`[ERROR] ${statusCode}: ${message}`);

  // Customize responses based on the error type (optional)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation Error: " + err.message;
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format.";
  }

  // Send the error response
  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Show stack trace only in development
  });
};

module.exports = errorHandler;
