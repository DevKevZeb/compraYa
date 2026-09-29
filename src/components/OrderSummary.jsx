import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { colors, spacing } from '../theme';
import { calculateOrderTotals, formatCurrency } from '../utils/order';

// Subtotal, shipping and total for a list of cart items.
export const OrderSummary = ({ items, style }) => {
  const { subtotal, shipping, total } = calculateOrderTotals(items);
  const count = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <View style={style}>
      <View style={styles.row}>
        <Text variant="bodyMedium" style={styles.muted}>
          Subtotal ({count} {count === 1 ? 'item' : 'items'})
        </Text>
        <Text variant="bodyMedium" style={styles.value}>
          {formatCurrency(subtotal)}
        </Text>
      </View>
      <View style={styles.row}>
        <Text variant="bodyMedium" style={styles.muted}>
          Shipping
        </Text>
        <Text variant="bodyMedium" style={styles.value}>
          {formatCurrency(shipping)}
        </Text>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.row}>
        <Text variant="titleMedium" style={styles.value}>
          Total
        </Text>
        <Text variant="titleLarge" style={styles.value}>
          {formatCurrency(total)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  muted: {
    color: colors.textMuted,
  },
  value: {
    color: colors.text,
  },
  divider: {
    marginVertical: spacing.sm,
  },
});
