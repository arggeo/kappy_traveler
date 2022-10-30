const JsonResponse = require('../helpers/Response');

const responseFormatter = (_, res, next) => {
   res.ok = function(data, code = 200) {
      res.status(code).json(JsonResponse.ok(data));
   };

   res.error = function(message, code = 400) {
      res.status(code).json(JsonResponse.error(message));
   };

   res.placeholder = function(message) {
      res.status(200).json(message);
   }

   next();
};

module.exports = responseFormatter;