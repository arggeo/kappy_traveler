import { it, expect } from 'vitest';
import urlParser from './urlParser.js';

it('should return Flicker image url', () => {
   const params = {
      server: 'a',
      id: 'b',
      secret: 'c'
   };

   const resultedUrl = 'https://live.staticflickr.com/a/b_c.jpg';

   const result = urlParser(params);

   expect(result).toBe(resultedUrl);
});