import { idToKey, keyToID } from '@/lib/url-shortener';

describe('Test url-shortener', () => {
  describe('Test idToKey', () => {
    describe('When id equal to 0', () => {
      it('function should return "Lq"', () => {
        const result = idToKey(0);

        expect(result).toBe('Lq');
      });
    });

    describe('When id equal to 61', () => {
      it('function should return "Lqa"', () => {
        const result = idToKey(61);

        expect(result).toBe('Lqa');
      });
    });

    describe('When id equal to 62', () => {
      it('function should return "L1q"', () => {
        const result = idToKey(62);

        expect(result).toBe('L1q');
      });
    });
  });

  describe('Test keyToID', () => {
    describe('When key equal to "Lq"', () => {
      it('function should return 0', () => {
        const result = keyToID('Lq');

        expect(result).toBe(0);
      });
    });

    describe('When key equal to "Lqa"', () => {
      it('function should return 61', () => {
        const result = keyToID('Lqa');

        expect(result).toBe(61);
      });
    });

    describe('When key equal to "L1q"', () => {
      it('function should return 62', () => {
        const result = keyToID('L1q');

        expect(result).toBe(62);
      });
    });
  });
});
