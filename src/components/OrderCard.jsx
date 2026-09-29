import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, shadows, spacing } from '../theme';
import { formatCurrency } from '../utils/order';
import { formatOrderDate, getOrderStatus } from '../utils/orderStatus';
import { ProductImage, StatusChip } from './ui';

const MAX_THUMBS = 3;

// Order summary row: number, date, status, product thumbnails and total.
export const OrderCard = ({ order, onPress }) => {
  const status = getOrderStatus(order.estado);
  const items = order.items_orden ?? [];
  const count = items.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <Pressable
      onPress={() => onPress(order)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={`Order ${order.numero_seguimiento}, ${status.label}`}
    >
      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text variant="titleSmall" style={styles.number}>
            {order.numero_seguimiento}
          </Text>
          <Text variant="bodySmall" style={styles.muted}>
            {formatOrderDate(order.fecha)}
          </Text>
        </View>
        <StatusChip label={status.label} tone={status.tone} />
      </View>

      <View style={styles.footer}>
        <View style={styles.thumbs}>
          {items.slice(0, MAX_THUMBS).map((item) => (
            <ProductImage
              key={item.item_orden_id}
              uri={item.productos?.url_imagen}
              height={44}
              radius={radius.sm}
              style={styles.thumb}
            />
          ))}
          {items.length > MAX_THUMBS ? (
            <View style={[styles.thumb, styles.more]}>
              <Text variant="labelMedium" style={styles.muted}>
                +{items.length - MAX_THUMBS}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.total}>
          <Text variant="bodySmall" style={styles.muted}>
            {count} {count === 1 ? 'item' : 'items'}
          </Text>
          <Text variant="titleMedium" style={styles.number}>
            {formatCurrency(order.monto_total)}
          </Text>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSubtle} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  number: {
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  thumbs: {
    flex: 1,
    flexDirection: 'row',
    gap: spacing.xs,
  },
  thumb: {
    width: 44,
    height: 44,
    backgroundColor: colors.background,
    borderRadius: radius.sm,
  },
  more: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    alignItems: 'flex-end',
  },
});
