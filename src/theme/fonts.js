import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import { configureFonts } from 'react-native-paper';

// Font files loaded at startup (see App.js).
export const fontAssets = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
};

export const fontFamilies = {
  regular: 'Inter_400Regular',
  medium: 'Inter_500Medium',
  semibold: 'Inter_600SemiBold',
  bold: 'Inter_700Bold',
};

// Each weight is its own font family, so fontWeight stays "normal" to avoid
// synthetic bolding on Android.
const variant = (fontFamily) => ({ fontFamily, fontWeight: 'normal' });

export const paperFonts = configureFonts({
  config: {
    displayLarge: variant(fontFamilies.bold),
    displayMedium: variant(fontFamilies.bold),
    displaySmall: variant(fontFamilies.bold),
    headlineLarge: variant(fontFamilies.bold),
    headlineMedium: variant(fontFamilies.bold),
    headlineSmall: variant(fontFamilies.bold),
    titleLarge: variant(fontFamilies.semibold),
    titleMedium: variant(fontFamilies.semibold),
    titleSmall: variant(fontFamilies.semibold),
    labelLarge: variant(fontFamilies.semibold),
    labelMedium: variant(fontFamilies.medium),
    labelSmall: variant(fontFamilies.medium),
    bodyLarge: variant(fontFamilies.regular),
    bodyMedium: variant(fontFamilies.regular),
    bodySmall: variant(fontFamilies.regular),
    default: variant(fontFamilies.regular),
  },
});
