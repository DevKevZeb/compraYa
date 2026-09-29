import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from 'react';
import { Animated, Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useFavoritesStore } from '../stores/favorites.store';
import { colors, radius, shadows } from '../theme';
import { tapFeedback } from '../utils/haptics';

// Heart toggle with a small "pop" when a product is saved.
export const FavoriteButton = ({ product, size = 18, style }) => {
  const favorite = useFavoritesStore((state) =>
    state.products.some((p) => p.producto_id === product.producto_id)
  );
  const toggle = useFavoritesStore((state) => state.toggle);
  const [scale] = useState(() => new Animated.Value(1));

  const onPress = async () => {
    tapFeedback();
    if (!favorite) {
      Animated.sequence([
        Animated.spring(scale, { toValue: 1.3, speed: 40, useNativeDriver: false }),
        Animated.spring(scale, { toValue: 1, speed: 20, useNativeDriver: false }),
      ]).start();
    }
    const { error } = await toggle(product);
    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update favorites', text2: error.message });
    }
  };

  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      style={[styles.button, { width: size * 2, height: size * 2 }, style]}
      accessibilityRole="button"
      accessibilityLabel={favorite ? 'Remove from favorites' : 'Add to favorites'}
      accessibilityState={{ selected: favorite }}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <MaterialCommunityIcons
          name={favorite ? 'heart' : 'heart-outline'}
          size={size}
          color={favorite ? '#E5484D' : colors.textMuted}
        />
      </Animated.View>
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
});
