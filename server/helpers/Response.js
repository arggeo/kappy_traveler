/**
 * Helper which formats reponse objects
 */
class JsonResponse {
   /**
    * Formats success response
    * @param {Object|array} data - Data to send in response
    * @returns {Object} Response object
    */
   static ok(data) {
      return {
         success: true,
         data
      };
   }

   /**
    * Formats error response
    * @param {string} message - Error message 
    * @returns Response object
    */
   static error(message) {
      return {
         success: false,
         message
      };
   }
}

export default JsonResponse;