import { useState, memo } from 'react';

import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { useCartStore } from '../Stores/card.store';
import { LoadingImageComponent } from './loadingImage.component';

export const CardComponent = memo(({ item, showDialog }) => {
	const { nombre_producto, url_imagen, precio, producto_id } = item;

	// Acciones del carrito
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const isInCart = useCartStore((state) => state.isInCart);

	// Estados locales
	const [loading, setLoading] = useState(true);

	const onLoading = () => {
		setLoading(true);
	};

	const emitNameProduct = () => {
		showDialog(nombre_producto);
	};

	const handleAddToCart = () => {
		addToCart({ nombre_producto, precio, cantidad: 1, producto_id });
	};

	const handleRemoveFromCart = () => {
		removeFromCart(producto_id);
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
				{loading && (
					<LoadingImageComponent />
				)}
				<Card.Cover
						style={{ heigth: '500vh', objectFit: 'cover' }}
						source={{ uri: url_imagen }}
						onLoadEnd={() => setLoading(false)}
					/>
			</View>
			<Card.Content style={{ marginTop: 20 }}>
				<Text>Precio: {precio} c/u</Text>
				<Text>Color: Negro - Rojo</Text>
			</Card.Content>
			<Card.Actions>
				{isInCart(producto_id) && (
					<Button
						buttonColor='#9C7CFE'
						mode='contained'
						textColor='#fff'
						style={{ backgroundColor: '#ff5f5f' }}
						onPress={handleRemoveFromCart}
					>
						Cancelar
					</Button>
				)}
				<Button
					buttonColor='#9C7CFE'
					textColor='#ffffff'
					icon='plus'
					onPress={handleAddToCart}
				>
					Añadir
				</Button>
			</Card.Actions>
		</Card>
	);
});
