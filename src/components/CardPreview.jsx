import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, fontFamilies, radius, shadows, spacing } from '../theme';
import { CARD_BRANDS, onlyDigits } from '../utils/card';

const GRADIENTS = {
  visa: ['#1A1F71', '#3F51B5'],
  mastercard: ['#1B1530', '#EB5A2B'],
  amex: ['#0E6F8A', '#2FB5C9'],
  unknown: [colors.primary, colors.primaryLight],
};

// Pads a partially typed card number with bullets, e.g. "4242 42•• •••• ••••".
const displayNumber = (value, last4) => {
  if (last4) return `••••  ••••  ••••  ${last4}`;
  const digits = onlyDigits(value).padEnd(16, '•').slice(0, 16);
  return digits.replace(/(.{4})/g, '$1  ').trim();
};

// Visual card that mirrors what the customer types (or a saved card).
export const CardPreview = ({ brand = 'unknown', number = '', last4, holder, expiry, compact }) => {
  const brandInfo = CARD_BRANDS[brand] ?? CARD_BRANDS.unknown;

  return (
    <LinearGradient
      colors={GRADIENTS[brand] ?? GRADIENTS.unknown}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, compact && styles.compact]}
    >
      <View style={styles.topRow}>
        <MaterialCommunityIcons
          name="integrated-circuit-chip"
          size={compact ? 26 : 34}
          color="#F4D27A"
        />
        <FontAwesome name={brandInfo.icon} size={compact ? 28 : 36} color={colors.onPrimary} />
      </View>
      <Text style={[styles.number, compact && styles.numberCompact]} numberOfLines={1}>
        {displayNumber(number, last4)}
      </Text>
      <View style={styles.bottomRow}>
        <View style={styles.field}>
          <Text variant="labelSmall" style={styles.label}>
            CARD HOLDER
          </Text>
          <Text variant="titleSmall" style={styles.value} numberOfLines={1}>
            {(holder || 'Your name').toUpperCase()}
          </Text>
        </View>
        <View>
          <Text variant="labelSmall" style={styles.label}>
            EXPIRES
          </Text>
          <Text variant="titleSmall" style={styles.value}>
            {expiry || 'MM/YY'}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.586,
    borderRadius: radius.xl,
    padding: spacing.xl,
    justifyContent: 'space-between',
    ...shadows.raised,
  },
  compact: {
    padding: spacing.lg,
    borderRadius: radius.lg,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  number: {
    color: colors.onPrimary,
    fontFamily: fontFamilies.semibold,
    fontSize: 21,
    letterSpacing: 1,
  },
  numberCompact: {
    fontSize: 17,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: spacing.lg,
  },
  field: {
    flex: 1,
  },
  label: {
    color: 'rgba(255, 255, 255, 0.7)',
    letterSpacing: 1,
  },
  value: {
    color: colors.onPrimary,
    marginTop: spacing.xxs,
  },
});
