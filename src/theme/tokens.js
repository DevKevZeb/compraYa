// Design tokens shared by every screen. Components read these instead of
// hardcoding colors, spacing or radii.

export const colors = {
  primary: '#6C4CE0',
  primaryPressed: '#5638C4',
  primaryLight: '#9C7CFE',
  primarySoft: '#EFEAFE',
  onPrimary: '#FFFFFF',

  background: '#F7F6FB',
  surface: '#FFFFFF',
  surfaceMuted: '#F1EEF8',
  border: '#E7E4F0',

  text: '#1B1530',
  textMuted: '#6B6880',
  textSubtle: '#9A97AB',

  success: '#1F9D55',
  successSoft: '#E3F6EA',
  warning: '#C98A0B',
  warningSoft: '#FFF4D6',
  error: '#D93A3A',
  errorSoft: '#FDE8E8',
  star: '#F5B301',

  overlay: 'rgba(27, 21, 48, 0.45)',
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const shadows = {
  card: { boxShadow: '0 2px 10px rgba(27, 21, 48, 0.06)' },
  raised: { boxShadow: '0 8px 24px rgba(27, 21, 48, 0.12)' },
  bar: { boxShadow: '0 -4px 16px rgba(27, 21, 48, 0.06)' },
};
