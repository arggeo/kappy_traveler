import * as dotenv from 'dotenv';
dotenv.config();
import { it, expect, vi } from 'vitest';
import getSights from './getSights';
import axios from 'axios';

vi.mock('axios');

it('should send request to valid Google url', async () => {
   const cityName = 'test city';
   const result = await getSights(cityName);
   console.log(result);

   expect(result.config.url).toContain('https://maps.googleapis.com/maps/api/place/textsearch/json?query=tourist+attractions+in+');
   expect(result.config.url).toContain(cityName);
   expect(result.config.url).toContain(`&key=${process.env.GOOGLE_MAPS_API_KEY}`);
});

it('should throw error if response is not 200', () => {
   axios.get.mockImplementationOnce((url) => {
      return new Promise((resolve, reject) => {
         const mockResponse = {
            config: { url },
            status: 200,
            data: [{ key: 'value' }]
         };
         reject(mockResponse);
      })
   });

   const cityName = 'test city';

   return expect(getSights(cityName)).rejects;
});