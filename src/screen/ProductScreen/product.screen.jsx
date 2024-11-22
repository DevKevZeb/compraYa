import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { ActivityIndicator, MD2Colors, Searchbar } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { CardComponent } from '../../components/card.component';
import { CategoryChipComponent } from '../../components/categoryChip.component';
import { DialogComponent } from '../../components/dialog.component';
import {
    getAllProducts,
    getNameCategory,
    getPopularProducts,
    getProductAtributeId,
    getProductId,
    getProductsBySearch
} from '../../services/api.services';
import { filterItem } from '../../services/filterFunction';
import { useCartStore } from '../../Stores/card.store';
import { useCategory, useProduct } from '../../Stores/global.store';
import { styles } from '../../styles/globalStyle';

export const ProductScreen = () => {
    // usamos los stores globales para guardar la data enviada desde el backend
    const categorys = useCategory((state) => state.categorys);
    const productsCategory = useProduct((state) => state.productsCategory);
    const productAtribute = useProduct((state) => state.productAtribute);
    const productSearchBar = useProduct((state) => state.productSearchBar);
    const noProductsFound = useProduct((state) => state.noProductsFound); // Nueva propiedad
    const resetProductSearch = useProduct((state) => state.resetProductSearch);
    const setNoProductsFound = useProduct((state) => state.setNoProductsFound); // Nueva función

    const cartItems = useCartStore((state) => state.cartItems);

    // Local state
    const [idCategory, setidCategory] = useState(0);
    const [visible, setVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [detailsProduct, setdetailsProduct] = useState({});

    const handleSearch = useCallback((searchQuery) => {
        setNoProductsFound(false); // Resetear el estado antes de cada búsqueda
        if (searchQuery.trim() === '') {
            resetProductSearch();
            return;
        }
        getProductsBySearch(searchQuery);
    }, [resetProductSearch, setNoProductsFound]);

    const debouncedSearch = useMemo(
        () => debounce((query) => handleSearch(query), 500),
        [handleSearch]
    );

    const onChangeSearch = (query) => {
        Toast.hide(); // Ocultar la notificación cuando se está escribiendo
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const filterProductName = useCallback((nameProduct) => {
        const myProduct = filterItem(
            productAtribute,
            nameProduct,
            'nombre_producto'
        );
        myProduct ? setdetailsProduct(myProduct) : null;
    }, [productAtribute]);

    const filterCategory = useCallback(async (nameCategory) => {
        resetProductSearch();
        setNoProductsFound(false); // Restablecer la bandera al seleccionar una categoría
        if (nameCategory === 'Todos') {
            await getAllProducts();
        } else if (nameCategory === 'Popular') {
            await getPopularProducts();
        } else {
            const myCategory = filterItem(categorys, nameCategory, 'nombre_categoria');
            myCategory ? setidCategory(myCategory.categoria_id) : null;
        }
    }, [categorys, resetProductSearch, setNoProductsFound]);

    useEffect(() => {
        getProductAtributeId();
        getNameCategory();
        filterCategory('Todos');
    }, [filterCategory]);

    useEffect(() => {
        if (idCategory == -1) { //Solicitar productos sin filtrado
            getAllProducts();
        } else {
            getProductId(idCategory);
        }
    }, [idCategory]);

    const showDialog = useCallback((Nombre) => {
        setVisible(true);
        filterProductName(Nombre);
    }, [filterProductName]);

    const hideDialog = () => setVisible(false);

    const renderProductItem = useCallback(({ item }) => {
        return <CardComponent item={item} showDialog={showDialog} />;
    }, [showDialog]);

    useEffect(() => {
        if (noProductsFound) {
            Toast.show({
                type: 'info',
                text1: 'No encontrado',
                text2: 'No existe un producto con ese nombre',
                duration: 1000, // Duración de la notificación en milisegundos
            });
        }
    }, [noProductsFound]);

    return (
        <View>
            <View style={styles.searchBar}>
                <Searchbar
                    placeholder='Busca un producto'
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                />
            </View>
            <View style={styles.filterChip}>
                {categorys.length == 0 ? (
                    <ActivityIndicator
                        animating={true}
                        color={MD2Colors.deepPurpleA100}
                    />
                ) : (
                    <CategoryChipComponent filterCategory={filterCategory} />
                )}
            </View>
            <View style={styles.scrollCard}>
                {!noProductsFound && (
                    <FlatList
                        data={productSearchBar.length > 0 ? productSearchBar : productsCategory}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                        getItemLayout={(data, index) => (
                            { length: 50, offset: 50 * index, index }
                        )}
                        initialNumToRender={10} // Número inicial de elementos a renderizar
                        maxToRenderPerBatch={10} // Número máximo de elementos a renderizar por lote
                        windowSize={5} // Tamaño de la ventana de renderizado
                    />
                )}
            </View>
            {visible && (
                <DialogComponent
                    visible={visible}
                    hideDialog={hideDialog}
                    detailProduct={detailsProduct}
                />
            )}
        </View>
    );
};