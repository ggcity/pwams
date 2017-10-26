import { TitleizePipe } from './titleize.pipe';

describe('TitleizePipe', () => {
  let pipe = new TitleizePipe();

  describe('#transform', () => {
    it('"sewer" to "Sewer"', () => {
      expect(pipe.transform('sewer')).toBe('Sewer');
    });

    it('"storm_water" into "Storm Water"', () => {
      expect(pipe.transform('storm_water')).toBe('Storm Water');
    });
  })
  
});
