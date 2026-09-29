import { useCallback } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { EmptyState } from '../../components/ui';
import { useFavoritesStore } from '../../stores/favorites.store';
import { colors, spacing } from '../../theme';

const SKELETONS = Array.from({ length: 4 }, (_, i) => ({ producto_id: `skeleton-${i}` }));

const withSpacer = (items) =>
  items.length % 2 === 1 ? [...items, { producto_id: 'spacer', spacer: true }] : items;

export const FavoritesScreen = ({ navigation }) => {
  const products = useFavoritesStore((state) => state.products);
  const loaded = useFavoritesStore((state) => state.loaded);
  const load = useFavoritesStore((state) => state.load);

  const openProduct = useCallback(
    (product) => navigation.navigate('ProductDetail', { product }),
    [navigation]
  );

  return (
    <FlatList
      style={styles.screen}
      data={loaded ? withSpacer(products) : SKELETONS}
      keyExtractor={(item) => String(item.producto_id)}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.list}
      renderItem={({ item }) =>
        item.spacer ? (
          <View style={styles.spacer} />
        ) : loaded ? (
          <ProductCard item={item} onPress={openProduct} />
        ) : (
          <ProductCardSkeleton />
        )
      }
      ListEmptyComponent={
        <EmptyState
          icon="heart-outline"
          title="No favorites yet"
          description="Tap the heart on any product to save it here."
          actionLabel="Browse products"
          onAction={() => navigation.navigate('HomeTab')}
        />
      }
      refreshing={false}
      onRefresh={load}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  column: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  spacer: {
    flex: 1,
  },
});
