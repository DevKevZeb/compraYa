import {
  dateToExpiry,
  detectCardBrand,
  expiryToDate,
  formatCardNumber,
  formatExpiry,
  getLast4,
  isValidCardNumber,
  isValidExpiry,
  maskCardNumber,
} from '../card';

describe('card utils', () => {
  describe('isValidCardNumber', () => {
    it.each(['4242 4242 4242 4242', '5555555555554444', '378282246310005'])(
      'accepts the valid test card %s',
      (number) => {
        expect(isValidCardNumber(number)).toBe(true);
      }
    );

    it('rejects numbers that fail the Luhn checksum', () => {
      expect(isValidCardNumber('4242 4242 4242 4241')).toBe(false);
    });

    it('rejects numbers with an invalid length', () => {
      expect(isValidCardNumber('4242')).toBe(false);
    });
  });

  describe('detectCardBrand', () => {
    it.each([
      ['4242424242424242', 'visa'],
      ['5555555555554444', 'mastercard'],
      ['2221000000000009', 'mastercard'],
      ['378282246310005', 'amex'],
      ['6011111111111117', 'unknown'],
    ])('detects %s as %s', (number, brand) => {
      expect(detectCardBrand(number)).toBe(brand);
    });
  });

  describe('formatCardNumber', () => {
    it('groups digits in blocks of four and drops extra digits', () => {
      expect(formatCardNumber('42424242424242429')).toBe('4242 4242 4242 4242');
    });

    it('uses the 4-6-5 layout for American Express', () => {
      expect(formatCardNumber('378282246310005')).toBe('3782 822463 10005');
    });

    it('ignores non-digit characters', () => {
      expect(formatCardNumber('4242-42')).toBe('4242 42');
    });
  });

  it('keeps only the last four digits', () => {
    expect(getLast4('4242 4242 4242 1234')).toBe('1234');
    expect(maskCardNumber('1234')).toBe('•••• •••• •••• 1234');
    expect(maskCardNumber('')).toBe('Sin detalles');
  });

  describe('expiry dates', () => {
    const now = new Date(2026, 8, 15); // September 2026

    it('formats MM/YY while typing', () => {
      expect(formatExpiry('1')).toBe('1');
      expect(formatExpiry('123')).toBe('12/3');
      expect(formatExpiry('12/305')).toBe('12/30');
    });

    it('accepts current and future months only', () => {
      expect(isValidExpiry('09/26', now)).toBe(true);
      expect(isValidExpiry('12/30', now)).toBe(true);
      expect(isValidExpiry('08/26', now)).toBe(false);
      expect(isValidExpiry('13/30', now)).toBe(false);
    });

    it('converts between MM/YY and ISO dates', () => {
      expect(expiryToDate('12/30')).toBe('2030-12-01');
      expect(dateToExpiry('2030-12-01')).toBe('12/30');
      expect(dateToExpiry('')).toBe('');
    });
  });
});
