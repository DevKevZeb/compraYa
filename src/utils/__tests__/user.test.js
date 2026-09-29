import { getFirstName, getInitials } from '../user';

describe('user utils', () => {
  it('builds up to two initials', () => {
    expect(getInitials('Kevin Zeballos')).toBe('KZ');
    expect(getInitials('ana maría lópez')).toBe('AM');
    expect(getInitials('Cher')).toBe('C');
    expect(getInitials('')).toBe('C');
  });

  it('extracts the first name', () => {
    expect(getFirstName('  Kevin Zeballos ')).toBe('Kevin');
    expect(getFirstName('')).toBe('');
  });
});
