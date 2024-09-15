import { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { useBadgeStore, useProduct } from '../Stores/global.store';
import { LoadingImageComponent } from './loadingImage.component';
import { filterItem } from '../services/filterFunction';
export const CardComponent = ({ item, showDialog }) => {
	const { nombre_producto, url_imagen, precio } = item;
	const incrementBadge = useBadgeStore((state) => state.incrementBadge);
	const decrementBadge = useBadgeStore((state) => state.decrementBadge);
	const setAddProduct = useProduct((state) => state.setAddProduct);
	const removeProductSelected = useProduct(
		(state) => state.removeProductSelected
	);
	const [loading, setLoading] = useState(true);
	const [showButton, setshowButton] = useState(false);
	const [disabled, setdisabled] = useState(false);

	const showButtonCancel = () => {
		setshowButton(true);
		incrementBadge();
		setdisabled(true);
		setAddProduct({ nombre_producto, precio, cantidad: 1 });
	};
	const hideButtons = () => {
		setshowButton(false);
		setdisabled(false);
		decrementBadge();
		removeProductSelected(nombre_producto);
	};
	const onLoading = () => {
		setLoading(false);
	};
	const emitNameProduct = () => {
		showDialog(nombre_producto);
	};
	return (
		<Card
			style={styles.card}
			onPress={emitNameProduct}
			elevation={3}
			mode='elevated'
			delayLongPress={3}
		>
			<Card.Title title={nombre_producto} style={styles.cardTitle} />
			<View style={styles.coverContainer}>
				{loading && <LoadingImageComponent />}
				<Card.Cover
					style={{ heigth: '50%' }}
					source={{ uri: url_imagen }}
					onLoadEnd={onLoading}
				/>
			</View>
			<Card.Content style={{ marginTop: 20 }}>
				<Text>Precio:{precio} c/u</Text>
				<Text>Color:Negro - Rojo</Text>
			</Card.Content>
			<Card.Actions>
				{showButton ? <Button onPress={hideButtons}>Cancelar</Button> : null}
				<Button
					buttonColor='#9C7CFE'
					textColor='#ffffff'
					icon='plus'
					onPress={showButtonCancel}
					disabled={disabled}
				>
					Añadir
				</Button>
			</Card.Actions>
		</Card>
	);
};
