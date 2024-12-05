// notFoundMiddleware.js

const notFoundMiddleware = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `404 Not Found: The route ${req.originalUrl} does not exist.`,
  });
};

module.exports = notFoundMiddleware;
