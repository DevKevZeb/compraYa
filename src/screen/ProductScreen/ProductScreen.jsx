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
import {
	useCategory,
	useProduct,
	useProductAtributeID,
} from '../../Stores/StoreBadge';
import {
	getNameCategory,
	getProductId,
	getProductAtributeId,
} from '../../services/httpServices';
export const ProductScreen = () => {
	const { categorys } = useCategory();
	const { products } = useProduct();
	const { productAtribute } = useProductAtributeID();
	const [idCategory, setidCategory] = useState(0);
	const [visible, setVisible] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [detailsProduct, setdetailsProduct] = useState({});

	const filterProductCategory = (nameProduct) => {
		const myProduct = productAtribute.find(
			(element) => element.nombre_producto == nameProduct
		);
		myProduct ? setdetailsProduct(myProduct) : null;
	};
	const filterCategory = (nameCategory) => {
		const myCategory = categorys.find(
			(element) => element.nombre_categoria == nameCategory
		);
		myCategory ? setidCategory(myCategory.categoria_id) : null;
	};
	useEffect(() => {
		getProductAtributeId();
	}, []);
	console.log('los', productAtribute);
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
					<ScrollView
						horizontal={true}
						showsHorizontalScrollIndicator={false}
						style={styles.scrollView}
					>
						{categorys.map((category, index) => (
							<Chip
								icon='check'
								onPress={() => filterCategory(category.nombre_categoria)}
								style={styles.chip}
								key={index}
							>
								{category.nombre_categoria}
							</Chip>
						))}
					</ScrollView>
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
