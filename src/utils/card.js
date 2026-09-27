// Card helpers. The full card number never leaves the device: only the brand
// and the last four digits are sent to the backend.

export const CARD_BRANDS = {
  visa: { label: 'Visa', icon: 'cc-visa' },
  mastercard: { label: 'Mastercard', icon: 'cc-mastercard' },
  amex: { label: 'American Express', icon: 'cc-amex' },
  unknown: { label: 'Tarjeta', icon: 'credit-card' },
};

export const onlyDigits = (value = '') => value.replace(/\D/g, '');

export const detectCardBrand = (cardNumber) => {
  const digits = onlyDigits(cardNumber);
  if (/^4/.test(digits)) return 'visa';
  if (/^(5[1-5]|2(2[2-9]|[3-6]\d|7[01]|720))/.test(digits)) return 'mastercard';
  if (/^3[47]/.test(digits)) return 'amex';
  return 'unknown';
};

// Groups digits the way they are printed on the card (4-6-5 for Amex, 4-4-4-4 otherwise).
export const formatCardNumber = (value) => {
  const brand = detectCardBrand(value);
  const maxLength = brand === 'amex' ? 15 : 16;
  const digits = onlyDigits(value).slice(0, maxLength);
  const groups = brand === 'amex' ? [4, 6, 5] : [4, 4, 4, 4];

  const parts = [];
  let index = 0;
  for (const size of groups) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  return parts.join(' ');
};

// Luhn checksum used by all major card networks.
export const isValidCardNumber = (value) => {
  const digits = onlyDigits(value);
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let double = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
};

export const getLast4 = (value) => onlyDigits(value).slice(-4);

export const maskCardNumber = (last4) => (last4 ? `•••• •••• •••• ${last4}` : 'Sin detalles');

// "1230" -> "12/30" while typing.
export const formatExpiry = (value) => {
  const digits = onlyDigits(value).slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

// Accepts MM/YY and rejects cards that already expired.
export const isValidExpiry = (value, now = new Date()) => {
  const match = /^(0[1-9]|1[0-2])\/(\d{2})$/.exec(value);
  if (!match) return false;
  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  return year > currentYear || (year === currentYear && month >= currentMonth);
};

// "12/30" -> "2030-12-01" (date column).
export const expiryToDate = (value) => {
  const [month, year] = value.split('/');
  return `20${year}-${month}-01`;
};

// "2030-12-01" -> "12/30".
export const dateToExpiry = (date) => (date ? `${date.slice(5, 7)}/${date.slice(2, 4)}` : '');
