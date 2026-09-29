import { MD3LightTheme } from 'react-native-paper';
import { colors, radius } from './tokens';

export { colors, radius, shadows, spacing } from './tokens';

// Material 3 theme built from the brand tokens (light only).
export const theme = {
  ...MD3LightTheme,
  roundness: radius.md / 4,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    onPrimary: colors.onPrimary,
    primaryContainer: colors.primarySoft,
    onPrimaryContainer: '#2A1570',
    secondary: colors.primaryLight,
    onSecondary: colors.onPrimary,
    secondaryContainer: colors.primarySoft,
    onSecondaryContainer: '#2A1570',
    background: colors.background,
    onBackground: colors.text,
    surface: colors.surface,
    onSurface: colors.text,
    surfaceVariant: colors.surfaceMuted,
    onSurfaceVariant: colors.textMuted,
    outline: '#D9D5E6',
    outlineVariant: colors.border,
    error: colors.error,
    errorContainer: colors.errorSoft,
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level0: 'transparent',
      level1: colors.surface,
      level2: colors.surface,
      level3: colors.surface,
    },
  },
};
