import { vi } from 'vitest';

const mockResponseData = [
   {
      key: 'value'
   },
   {
      key: 'value'
   }
];

export default {
   get: vi.fn((url) => {
      return new Promise((resolve, reject) => {
         const mockResponse = {
            config: { url },
            status: 200,
            data: mockResponseData
         };
         resolve(mockResponse);
      });
   })
};