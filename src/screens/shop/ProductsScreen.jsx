import { useCallback, useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, Searchbar, Text } from 'react-native-paper';
import { ProductCard } from '../../components/ProductCard';
import { CategoryChips } from '../../components/CategoryChips';
import { ProductDialog } from '../../components/ProductDialog';
import { getCategories, getProducts } from '../../services/api';
import { styles as globalStyles } from '../../styles/global';

const SEARCH_DEBOUNCE_MS = 400;

export const ProductsScreen = () => {
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
          error: queryError ? 'No se pudieron cargar los productos.' : null,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, [categoryId, search, requestKey]);

  const renderEmpty = () => {
    if (loading) {
      return <ActivityIndicator style={styles.feedback} color="#9C7CFE" />;
    }
    if (error) {
      return (
        <View style={styles.feedback}>
          <Text>{error}</Text>
          <Button onPress={reload}>Reintentar</Button>
        </View>
      );
    }
    return (
      <Text style={styles.feedback}>
        {search ? `No existe un producto que coincida con "${search}".` : 'No hay productos.'}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={globalStyles.searchBar}>
        <Searchbar
          placeholder="Busca un producto"
          onChangeText={setSearchQuery}
          value={searchQuery}
        />
      </View>
      <View style={globalStyles.filterChip}>
        <CategoryChips categories={categories} selectedId={categoryId} onSelect={setCategoryId} />
      </View>
      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={products}
        keyExtractor={(item) => item.producto_id.toString()}
        renderItem={({ item }) => <ProductCard item={item} onPress={setSelectedProduct} />}
        ListEmptyComponent={renderEmpty}
        refreshing={loading && products.length > 0}
        onRefresh={reload}
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
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 10,
  },
  feedback: {
    marginTop: 40,
    alignItems: 'center',
    textAlign: 'center',
  },
});
