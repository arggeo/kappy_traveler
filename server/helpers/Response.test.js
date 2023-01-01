import { describe, it, expect } from 'vitest';
import JsonResponse from './Response.js';

describe('ok()', () => {
   it('should return success response object', () => {
      const data = {
         key: 'value'
      };

      const expectedRes = {
         success: true,
         data
      };

      const response = JsonResponse.ok(data);

      expect(response).toEqual(expectedRes);
   });
});

describe('error()', () => {
   it('should return error response object', () => {
      const message = 'Error';

      const expectedRes = {
         success: false,
         message
      };

      const response = JsonResponse.error(message);

      expect(response).toEqual(expectedRes);
   });
});