// "Kevin Zeballos" -> "KZ"; falls back to "C" (CompraYa) for empty names.
export const getInitials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'C';

export const getFirstName = (name = '') => name.trim().split(' ')[0] ?? '';
