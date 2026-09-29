import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ProductCard } from '../../components/ProductCard';
import { ProductGallery } from '../../components/ProductGallery';
import { Price, QuantityStepper, Rating, SectionHeader, StatusChip } from '../../components/ui';
import { getProducts } from '../../services/api';
import { useCartStore } from '../../stores/cart.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { formatCurrency } from '../../utils/order';
import { getProductImages, getStockStatus } from '../../utils/product';

const STOCK_TONES = { in: 'success', low: 'warning', out: 'error' };
const RELATED_COUNT = 6;

export const ProductDetailScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const insets = useSafeAreaInsets();
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [expanded, setExpanded] = useState(false);
  const [related, setRelated] = useState([]);

  const stockStatus = getStockStatus(product.stock);
  const outOfStock = stockStatus.key === 'out';
  const brand = product.atributos_producto?.find((a) => a.nombre_atributo === 'Brand');

  useEffect(() => {
    let cancelled = false;
    getProducts({ categoryId: product.categoria_id }).then(({ data }) => {
      if (!cancelled) {
        setRelated(
          (data ?? []).filter((p) => p.producto_id !== product.producto_id).slice(0, RELATED_COUNT)
        );
      }
    });
    return () => {
      cancelled = true;
    };
  }, [product.categoria_id, product.producto_id]);

  const handleAdd = () => {
    addToCart(product, quantity);
    Toast.show({
      type: 'success',
      text1: 'Added to cart',
      text2: `${quantity} × ${product.nombre_producto}`,
    });
  };

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <ProductGallery images={getProductImages(product)} name={product.nombre_producto} />

        <View style={styles.sheet}>
          {brand ? (
            <Text variant="labelLarge" style={styles.brand}>
              {brand.valor_atributo.toUpperCase()}
            </Text>
          ) : null}
          <Text variant="headlineSmall" style={styles.title}>
            {product.nombre_producto}
          </Text>

          <View style={styles.metaRow}>
            <Rating popularity={product.popularidad} size={16} showMax />
            <StatusChip label={stockStatus.label} tone={STOCK_TONES[stockStatus.key]} />
          </View>

          <Price value={product.precio} variant="headlineMedium" style={styles.price} />

          {product.descripcion ? (
            <View style={styles.section}>
              <SectionHeader title="Description" />
              <Text
                variant="bodyMedium"
                style={styles.description}
                numberOfLines={expanded ? undefined : 3}
              >
                {product.descripcion}
              </Text>
              <Button
                compact
                onPress={() => setExpanded((value) => !value)}
                style={styles.readMore}
              >
                {expanded ? 'Show less' : 'Read more'}
              </Button>
            </View>
          ) : null}

          {product.atributos_producto?.length ? (
            <View style={styles.section}>
              <SectionHeader title="Details" />
              <View style={styles.table}>
                {product.atributos_producto.map((attribute, index) => (
                  <View
                    key={attribute.nombre_atributo}
                    style={[styles.tableRow, index > 0 && styles.tableDivider]}
                  >
                    <Text variant="bodyMedium" style={styles.muted}>
                      {attribute.nombre_atributo}
                    </Text>
                    <Text variant="bodyMedium" style={styles.value}>
                      {attribute.valor_atributo}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {related.length > 0 ? (
            <View style={styles.section}>
              <SectionHeader title="More from this category" />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.relatedRow}
              >
                {related.map((item) => (
                  <View key={item.producto_id} style={styles.relatedItem}>
                    <ProductCard
                      item={item}
                      onPress={(next) => navigation.push('ProductDetail', { product: next })}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <IconButton
        icon="chevron-left"
        size={26}
        mode="contained"
        containerColor={colors.surface}
        onPress={navigation.goBack}
        accessibilityLabel="Go back"
        style={[styles.back, { top: insets.top + spacing.sm }]}
      />

      <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.md }]}>
        <QuantityStepper value={quantity} onChange={setQuantity} max={Math.max(product.stock, 1)} />
        <Button
          mode="contained"
          icon="cart-plus"
          onPress={handleAdd}
          disabled={outOfStock}
          style={styles.addButton}
          contentStyle={styles.addContent}
        >
          {outOfStock ? 'Out of stock' : `Add · ${formatCurrency(product.precio * quantity)}`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scroll: {
    paddingBottom: 110,
  },
  sheet: {
    marginTop: -spacing.xl,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    ...shadows.card,
  },
  brand: {
    color: colors.primary,
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    marginTop: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  price: {
    color: colors.text,
    marginTop: spacing.lg,
  },
  section: {
    marginTop: spacing.xxl,
  },
  description: {
    color: colors.textMuted,
    lineHeight: 22,
  },
  readMore: {
    alignSelf: 'flex-start',
    marginLeft: -spacing.sm,
  },
  table: {
    backgroundColor: colors.background,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    gap: spacing.lg,
  },
  tableDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  muted: {
    color: colors.textMuted,
  },
  value: {
    color: colors.text,
    flexShrink: 1,
    textAlign: 'right',
  },
  relatedRow: {
    gap: spacing.md,
    paddingBottom: spacing.xs,
  },
  relatedItem: {
    width: 170,
  },
  back: {
    position: 'absolute',
    left: spacing.md,
    ...shadows.card,
  },
  bar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.bar,
  },
  addButton: {
    flex: 1,
    borderRadius: radius.pill,
  },
  addContent: {
    height: 50,
  },
});
