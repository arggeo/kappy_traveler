require('dotenv').config();
import { it, expect, vi } from 'vitest';
import getHospitals from './getHospitals';
import axios from 'axios';

vi.mock('axios');

it('should return array', async () => {
   const cityName = 'test city';
   const lat = 0;
   const lng = 0;
   const result = await getHospitals(cityName, lat, lng);
   console.log(result);

   expect(result.data).toBeTypeOf('array');
});

it('should throw error if response is not 200', () => {
   axios.get.mockImplementationOnce((url) => {
      return new Promise((resolve, reject) => {
         const mockResponse = {
            config: { url },
            status: 400,
            data: [{ key: 'value' }]
         };
         reject(mockResponse);
      })
   });

   const cityName = 'test city';
   const lat = 0;
   const lng = 0;

   return expect(getHospitals(cityName, lat, lng)).rejects;
});