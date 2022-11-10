/**
 * Middleware to log request
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @callback next
 */

const requestLogger = (req, res, next) => {
    console.log(req.params);
    next();
};

module.exports = requestLogger;