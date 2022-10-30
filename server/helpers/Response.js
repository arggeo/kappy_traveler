class JsonResponse {

   static ok(data) {
      return {
         success: true,
         data
      };
   }

   static error(message) {
      return {
         success: false,
         message
      };
   }
}

module.exports = JsonResponse;