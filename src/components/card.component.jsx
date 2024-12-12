import { useState, memo } from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { useCartStore } from '../Stores/card.store';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const CardComponent = memo(({ item, showDialog }) => {
	const { nombre_producto, url_imagen, precio, producto_id, popularidad,stok } =
		item;

	// Acciones del carrito
	const addToCart = useCartStore((state) => state.addToCart);
	const removeFromCart = useCartStore((state) => state.removeFromCart);
	const isInCart = useCartStore((state) => state.isInCart);

	const emitNameProduct = () => {
		showDialog(nombre_producto);
	};

	const handleAddToCart = () => {
		addToCart({ nombre_producto, precio, cantidad: 1, producto_id });
	};

	const handleRemoveFromCart = () => {
		removeFromCart(producto_id);
	};

	const scaledPopularity = (popularidad / 100) * 5;

	const renderStars = () => {
		const stars = [];
		for (let i = 1; i <= 5; i++) {
			// Decidir si la estrella es llena, media o vacía
			if (i <= Math.floor(scaledPopularity)) {
				stars.push(
					<MaterialIcons
						key={i}
						name='star'
						size={40}
						color='gold'
					/>
				);
			} else if (i - 0.5 <= scaledPopularity) {
				stars.push(
					<MaterialIcons
						key={i}
						name='star-half'
						size={40}
						color='gold'
					/>
				);
			} else {
				stars.push(
					<MaterialIcons
						key={i}
						name='star-border'
						size={40}
						color='gold'
					/>
				);
			}
		}
		return stars;
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
			<Card.Cover
				style={{ heigth: '500vh', objectFit: 'cover' }}
				source={{ uri: url_imagen }}
			/>
			<Card.Content style={{ marginTop: 20 }}>
				<Text>Precio: {precio} c/u</Text>
				<Text>Color: Negro - Rojo</Text>
				<View style={styleCard.startsRow}>
					<Text style={styleCard.startsContainer}>
						 {renderStars()}
					</Text>
					<Text>{popularidad}%</Text>
				</View>
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

const styleCard = StyleSheet.create({
	startsRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	startsContainer: {
		flexDirection:'row',
		alignItems: 'center'
	},
});
