import { FlatList, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { CartLine } from '../../components/CartLine';
import { OrderSummary } from '../../components/OrderSummary';
import { EmptyState } from '../../components/ui';
import { useCartStore } from '../../stores/cart.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { calculateOrderTotals, formatCurrency } from '../../utils/order';

export const CartScreen = ({ navigation }) => {
  const cartItems = useCartStore((state) => state.cartItems);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { total } = calculateOrderTotals(cartItems);

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <EmptyState
          icon="cart-outline"
          title="Your cart is empty"
          description="Add products from the catalog and they will show up here."
          actionLabel="Browse products"
          onAction={() => navigation.navigate('HomeTab')}
        />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => String(item.producto_id)}
        renderItem={({ item }) => (
          <CartLine item={item} onChangeQuantity={setQuantity} onRemove={removeFromCart} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={
          <Button icon="trash-can-outline" onPress={clearCart} style={styles.clear}>
            Clear cart
          </Button>
        }
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.summary}>
        <OrderSummary items={cartItems} />
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Checkout')}
          style={styles.checkout}
          contentStyle={styles.checkoutContent}
        >
          {`Checkout · ${formatCurrency(total)}`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.lg,
  },
  separator: {
    height: spacing.md,
  },
  clear: {
    alignSelf: 'center',
    marginTop: spacing.md,
  },
  summary: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    ...shadows.bar,
  },
  checkout: {
    marginTop: spacing.md,
    borderRadius: radius.pill,
  },
  checkoutContent: {
    height: 50,
  },
});
