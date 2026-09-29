import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { colors, radius, shadows, spacing } from '../theme';
import { Price, ProductImage, QuantityStepper } from './ui';

// One cart row: thumbnail, name, unit price, quantity and line total.
export const CartLine = ({ item, onChangeQuantity, onRemove }) => (
  <View style={styles.row}>
    <ProductImage
      uri={item.url_imagen}
      height={76}
      style={styles.thumb}
      accessibilityLabel={item.nombre_producto}
    />
    <View style={styles.info}>
      <View style={styles.titleRow}>
        <Text variant="titleSmall" numberOfLines={2} style={styles.name}>
          {item.nombre_producto}
        </Text>
        <IconButton
          icon="close"
          size={18}
          onPress={() => onRemove(item.producto_id)}
          accessibilityLabel={`Remove ${item.nombre_producto}`}
          style={styles.remove}
        />
      </View>
      <Price value={item.precio} variant="bodySmall" color={colors.textMuted} />
      <View style={styles.bottomRow}>
        <QuantityStepper
          value={item.cantidad}
          onChange={(quantity) => onChangeQuantity(item.producto_id, quantity)}
          allowZero
          size="small"
        />
        <Price value={item.precio * item.cantidad} variant="titleMedium" />
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.card,
  },
  thumb: {
    width: 76,
    backgroundColor: colors.background,
  },
  info: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.xs,
  },
  name: {
    flex: 1,
    color: colors.text,
  },
  remove: {
    margin: -spacing.sm,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
});
