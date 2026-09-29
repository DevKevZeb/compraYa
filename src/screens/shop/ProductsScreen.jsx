import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Searchbar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryChips } from '../../components/CategoryChips';
import { ProductCard } from '../../components/ProductCard';
import { ProductCardSkeleton } from '../../components/ProductCardSkeleton';
import { ProductDialog } from '../../components/ProductDialog';
import { PromoBanners } from '../../components/PromoBanners';
import { EmptyState, SectionHeader } from '../../components/ui';
import { getCategories, getProducts } from '../../services/api';
import { useUserStore } from '../../stores/user.store';
import { colors, fontFamilies, radius, spacing } from '../../theme';

const SEARCH_DEBOUNCE_MS = 400;
const POPULAR_COUNT = 8;
const SKELETONS = Array.from({ length: 4 }, (_, i) => ({ producto_id: `skeleton-${i}` }));

// Keeps the last card half width when a grid row is incomplete.
const withSpacer = (items) =>
  items.length % 2 === 1 ? [...items, { producto_id: 'spacer', spacer: true }] : items;

const initials = (name = '') =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || 'C';

export const ProductsScreen = () => {
  const insets = useSafeAreaInsets();
  const userName = useUserStore((state) => state.user?.nombre_usuario ?? '');
  const firstName = userName.split(' ')[0];

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [search, setSearch] = useState('');
  const [reloadCount, setReloadCount] = useState(0);
  const [result, setResult] = useState({ key: null, products: [], error: null });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Each filter combination is a request; results are loading until they match it.
  const requestKey = `${categoryId}|${search}|${reloadCount}`;
  const loading = result.key !== requestKey;
  const { products, error } = result;
  const reload = useCallback(() => setReloadCount((count) => count + 1), []);
  const browsing = !search;
  const categoryName = categories.find((c) => c.categoria_id === categoryId)?.nombre_categoria;

  useEffect(() => {
    getCategories().then(({ data }) => setCategories(data ?? []));
  }, []);

  // Only query the backend once the user stops typing.
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchQuery.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchQuery]);

  useEffect(() => {
    let cancelled = false;
    getProducts({ categoryId, search }).then(({ data, error: queryError }) => {
      if (!cancelled) {
        setResult({
          key: requestKey,
          products: data ?? [],
          error: queryError ? 'We could not load the products.' : null,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId, search, requestKey]);

  const popular = useMemo(
    () => (browsing && !categoryId ? products.slice(0, POPULAR_COUNT) : []),
    [browsing, categoryId, products]
  );

  const header = (
    <View>
      <View style={[styles.top, { paddingTop: insets.top + spacing.lg }]}>
        <View style={styles.greeting}>
          <Text variant="bodyMedium" style={styles.muted}>
            {firstName ? `Hi, ${firstName} 👋` : 'Hi there 👋'}
          </Text>
          <Text variant="headlineSmall" style={styles.heading}>
            What are you looking for today?
          </Text>
        </View>
        <Avatar.Text
          size={44}
          label={initials(userName)}
          style={styles.avatar}
          color={colors.primary}
        />
      </View>

      <View style={styles.searchWrap}>
        <Searchbar
          placeholder="Search products"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.search}
          inputStyle={styles.searchInput}
          elevation={0}
        />
      </View>

      {browsing ? (
        <>
          {!categoryId ? (
            <View style={styles.section}>
              <PromoBanners categories={categories} onSelectCategory={setCategoryId} />
            </View>
          ) : null}

          <View style={styles.section}>
            <CategoryChips
              categories={categories}
              selectedId={categoryId}
              onSelect={setCategoryId}
            />
          </View>

          {popular.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="Popular now" style={styles.padded} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.popularRow}
              >
                {popular.map((item) => (
                  <View key={item.producto_id} style={styles.popularItem}>
                    <ProductCard item={item} onPress={setSelectedProduct} />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </>
      ) : null}

      <SectionHeader
        title={search ? `Results for "${search}"` : categoryName ? categoryName : 'All products'}
        style={[styles.padded, styles.section]}
      />
    </View>
  );

  const renderEmpty = () =>
    error ? (
      <EmptyState
        icon="wifi-off"
        title="Something went wrong"
        description={error}
        actionLabel="Try again"
        onAction={reload}
      />
    ) : (
      <EmptyState
        icon="magnify-close"
        title="No products found"
        description={search ? `Nothing matches "${search}". Try another search.` : undefined}
      />
    );

  return (
    <View style={styles.screen}>
      <FlatList
        data={loading ? SKELETONS : withSpacer(products)}
        keyExtractor={(item) => String(item.producto_id)}
        numColumns={2}
        columnWrapperStyle={styles.column}
        renderItem={({ item }) =>
          item.spacer ? (
            <View style={styles.spacer} />
          ) : loading ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard item={item} onPress={setSelectedProduct} />
          )
        }
        ListHeaderComponent={header}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.list}
        refreshing={loading && products.length > 0}
        onRefresh={reload}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
      {selectedProduct && (
        <ProductDialog
          visible
          hideDialog={() => setSelectedProduct(null)}
          detailProduct={selectedProduct}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  greeting: {
    flex: 1,
  },
  muted: {
    color: colors.textMuted,
  },
  heading: {
    color: colors.text,
    marginTop: spacing.xxs,
  },
  avatar: {
    backgroundColor: colors.primarySoft,
  },
  searchWrap: {
    paddingHorizontal: spacing.lg,
    marginTop: spacing.lg,
  },
  search: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    fontFamily: fontFamilies.regular,
  },
  section: {
    marginTop: spacing.xl,
  },
  padded: {
    paddingHorizontal: spacing.lg,
  },
  popularRow: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xs,
  },
  popularItem: {
    width: 170,
  },
  spacer: {
    flex: 1,
  },
  column: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
});
