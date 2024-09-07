import * as React from 'react';
import { View, FlatList, ScrollView } from 'react-native';
import { Searchbar, Chip } from 'react-native-paper';
import { styles } from '../../styles/globalStyle';
import { nameProducts } from '../../assets/data/nameProductos';
import { DialogComponent } from '../../components/DialogComponent';
import { CardComponent } from '../../components/CardComponent';
supabase;
import { getNameCategory } from '../../services/httpServices';
import { supabase } from '../../../lib/initSupaBase';

export const ProductScreen = () => {
	const [categorys, setcategorys] = React.useState([]);
	const [error, seterror] = React.useState(null);
	const [visible, setVisible] = React.useState(false);
	const [searchQuery, setSearchQuery] = React.useState('');
	const [nameProduct, setnameProduct] = React.useState('');
	React.useEffect(() => {
		loadCategorys();
	}, []);
	const loadCategorys = async () => {
		const { categorías, error } = await getNameCategory(); // Especifica el nombre de la tabla
		if (error) {
			seterror(error.message);
		} else {
			setcategorys(categorías);
		}
	};
	
	const showDialog = (nombre) => {
		setVisible(true);
		setnameProduct(nombre);
	};
	const hideDialog = () => setVisible(false);

	console.log(nameProduct);
	const item = ({ item }) => {
		const { Nombre } = item;
		return <CardComponent Nombre={Nombre} showDialog={showDialog} />;
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
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={styles.scrollView}
				>
					{categorys.map((category, index) => (
						<Chip
							icon='check'
							onPress={() => console.log('Pressed')}
							style={styles.chip}
							key={index}
						>
							{category.nombre_categoria}
						</Chip>
					))}
				</ScrollView>
			</View>
			<View style={styles.scrollCard}>
				<FlatList
					data={nameProducts}
					renderItem={item}
					KeyExtractor={(item) => item.id}
				/>
			</View>
			{visible ? (
				<DialogComponent
					visible={visible}
					hideDialog={hideDialog}
					title={nameProduct}
				/>
			) : null}
		</View>
	);
};
