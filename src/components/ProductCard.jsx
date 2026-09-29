import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Badge, Text } from 'react-native-paper';
import { useCartStore } from '../stores/cart.store';
import { colors, radius, shadows, spacing } from '../theme';
import { getStockStatus } from '../utils/product';
import { Price, ProductImage, Rating } from './ui';

// Compact catalog tile: image, name, rating, price and a quick "add" button.
export const ProductCard = memo(function ProductCard({ item, onPress, style }) {
  const { nombre_producto, url_imagen, precio, producto_id, popularidad, stock } = item;

  const addToCart = useCartStore((state) => state.addToCart);
  // Select a primitive (not a function) so the card re-renders when the cart changes.
  const quantityInCart = useCartStore(
    (state) =>
      state.cartItems.find((cartItem) => cartItem.producto_id === producto_id)?.cantidad ?? 0
  );
  const stockStatus = getStockStatus(stock);
  const outOfStock = stockStatus.key === 'out';

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [styles.card, pressed && styles.pressed, style]}
      accessibilityRole="button"
      accessibilityLabel={nombre_producto}
    >
      <ProductImage uri={url_imagen} height={130} accessibilityLabel={nombre_producto} />

      <View style={styles.body}>
        <Text variant="bodyMedium" numberOfLines={2} style={styles.name}>
          {nombre_producto}
        </Text>
        <Rating popularity={popularidad} />
        {stockStatus.key !== 'in' ? (
          <Text
            variant="labelSmall"
            style={[styles.stock, outOfStock ? styles.stockOut : styles.stockLow]}
          >
            {stockStatus.label}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Price value={precio} variant="titleMedium" />
          <Pressable
            onPress={() => addToCart({ nombre_producto, precio, producto_id })}
            disabled={outOfStock}
            style={({ pressed }) => [
              styles.add,
              outOfStock && styles.addDisabled,
              pressed && styles.addPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Add ${nombre_producto} to cart`}
            accessibilityState={{ disabled: outOfStock }}
            hitSlop={8}
          >
            <MaterialCommunityIcons name="plus" size={20} color={colors.onPrimary} />
            {quantityInCart > 0 ? (
              <Badge size={18} style={styles.badge}>
                {quantityInCart}
              </Badge>
            ) : null}
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.sm,
    ...shadows.card,
  },
  pressed: {
    opacity: 0.9,
  },
  body: {
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.sm,
    gap: spacing.xs,
    flex: 1,
  },
  name: {
    color: colors.text,
    minHeight: 40,
  },
  stock: {
    marginTop: spacing.xxs,
  },
  stockLow: {
    color: colors.warning,
  },
  stockOut: {
    color: colors.error,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: spacing.xs,
  },
  add: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPressed: {
    backgroundColor: colors.primaryPressed,
  },
  addDisabled: {
    backgroundColor: colors.textSubtle,
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: colors.text,
  },
});
