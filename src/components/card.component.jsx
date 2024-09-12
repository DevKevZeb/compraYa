import { useState } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { useBadgeStore } from '../Stores/global.store';
import { LoadingImageComponent } from './loadingImage.component';
import { filterItem } from '../services/filterFunction';
export const CardComponent = ({
	Nombre,
	uri,
	showDialog,
	addProductSelected,
}) => {
	const incrementBadge = useBadgeStore((state) => state.incrementBadge);
	const decrementBadge = useBadgeStore((state) => state.decrementBadge);

	const [loading, setLoading] = useState(true);
	const [showButton, setshowButton] = useState(false);
	const [disabled, setdisabled] = useState(false);

	
	const showButtonCancel = () => {
		setshowButton(true);
		incrementBadge();
		setdisabled(true);
		emitNameProduct()
	};
	const hideButtons = () => {
		setshowButton(false);
		setdisabled(false);
		decrementBadge();
	};
	const onLoading = () => {
		setLoading(false);
	};
	const emitNameProduct = (nombre) => {
		showDialog(nombre);
	};
	return (
		<Card
			style={styles.card}
			onPress={emitNameProduct}
			elevation={3}
			mode='elevated'
			delayLongPress={3}
		>
			<Card.Title title={Nombre} style={styles.cardTitle} />
			<View style={styles.coverContainer}>
				{loading && <LoadingImageComponent />}
				<Card.Cover
					style={{ heigth: '50%' }}
					source={{ uri }}
					onLoadEnd={onLoading}
				/>
			</View>
			<Card.Content style={{ marginTop: 20 }}>
				<Text>Precio:125 c/u</Text>
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
