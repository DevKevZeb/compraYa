import { useState, useEffect } from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import {
	Searchbar,
	Chip,
	ActivityIndicator,
	MD2Colors,
} from 'react-native-paper';
import { styles } from '../../styles/globalStyle';
import { DialogComponent } from '../../components/DialogComponent';
import { CardComponent } from '../../components/CardComponent';
import { useCategory, useProduct } from '../../Stores/StoreBadge';
import {
	getNameCategory,
	getProductId,
	getProductAtributeId,
} from '../../services/httpServices';
import { filterItem } from '../../services/filterFunction';
import { CategoryChipComponent } from '../../components/CategoryChipComponent';
export const ProductScreen = () => {
	const { categorys } = useCategory();
	const { products, productAtribute } = useProduct();
	const [idCategory, setidCategory] = useState(0);
	const [selectedCategory, setselectedCategory] = useState(false);
	const [visible, setVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [detailsProduct, setdetailsProduct] = useState({});

	const filterProductCategory = (nameProduct) => {
		const myProduct = filterItem(productAtribute,nameProduct,'nombre_producto');
		myProduct ? setdetailsProduct(myProduct) : null;
	};
	const filterCategory = (nameCategory) => {
		const myCategory = filterItem(categorys, nameCategory, 'nombre_categoria');
		myCategory ? setidCategory(myCategory.categoria_id) : null;
	};
	useEffect(() => {
		getProductAtributeId();
	}, []);
	useEffect(() => {
		getNameCategory();
	}, []);
	useEffect(() => {
		getProductId(idCategory);
	}, [idCategory]);

	const showDialog = (Nombre) => {
		setVisible(true);
		filterProductCategory(Nombre);
	};
	const hideDialog = () => setVisible(false);

	const item = ({ item }) => {
		const { nombre_producto, url_imagen } = item;
		return (
			<CardComponent
				Nombre={nombre_producto}
				showDialog={showDialog}
				uri={url_imagen}
			/>
		);
	};

	return (
		<View>
			<View style={styles.searchBar}>
				<Searchbar
					placeholder='busca un producto'
					onChangeText={setSearchQuery}
					value={searchQuery}
				/>
			</View>
			<View style={styles.filterChip}>
				{categorys.length == 0 ? (
					<ActivityIndicator animating={true} color={MD2Colors.red800} />
				) : (
					<CategoryChipComponent filterCategory={filterCategory}/>
				)}
			</View>
			<View style={styles.scrollCard}>
				<FlatList
					data={products}
					renderItem={item}
					KeyExtractor={(item) => item.id}
				/>
			</View>
			{visible ? (
				<DialogComponent
					visible={visible}
					hideDialog={hideDialog}
					detailProduct={detailsProduct}
				/>
			) : null}
		</View>
	);
};
