const JsonResponse = require('../helpers/Response');

/**
 * Middleware to format response object with additional functions
 * @param {Object} _ - The request object
 * @param {*} res - The response object
 * @callback next
 */
const responseFormatter = (_, res, next) => {
   /**
    * Adds "ok" helper function on response object
    * @param {Object|array} data - Data to send in response
    * @param {number} [code=200] - The response status code 
    */
   res.ok = function(data, code = 200) {
      res.status(code).json(JsonResponse.ok(data));
   };

   /**
    * Adds "error" helper function on response object
    * @param {string} message - Error message 
    * @param {number} [code=400] - The response status code 
    */
   res.error = function(message, code = 400) {
      res.status(code).json(JsonResponse.error(message));
   };

   /**
    * Adds "placeholder" helper function on reponse object
    * @param {string} message - Message
    */
   res.placeholder = function(message) {
      res.status(200).json(message);
   }

   next();
};

module.exports = responseFormatter;