import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { Pressable, StyleSheet } from 'react-native';
import { Badge } from 'react-native-paper';
import { useCartStore } from '../stores/cart.store';
import { colors, radius, shadows } from '../theme';

// Shortcut to the cart with the number of items, usable from any screen.
export const CartButton = ({ style, size = 44 }) => {
  const navigation = useNavigation();
  const count = useCartStore((state) => state.totalItemsInCart());

  return (
    <Pressable
      onPress={() => navigation.navigate('CartTab', { screen: 'Cart' })}
      style={({ pressed }) => [
        styles.button,
        { width: size, height: size },
        pressed && styles.pressed,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={count > 0 ? `Open cart, ${count} items` : 'Open cart'}
      hitSlop={6}
    >
      <MaterialCommunityIcons name="cart-outline" size={size * 0.5} color={colors.text} />
      {count > 0 ? (
        <Badge size={20} style={styles.badge}>
          {count}
        </Badge>
      ) : null}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.card,
  },
  pressed: {
    backgroundColor: colors.surfaceMuted,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: colors.primary,
  },
});
