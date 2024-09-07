import React from 'react';
import { Text } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { useBadgeStore } from '../context/store';

export const CardComponent = ({ Nombre, showDialog }) => {
	const { incrementBadge, decrementBadge } = useBadgeStore();
	const [showButton, setshowButton] = React.useState(false);
	const [disabled, setdisabled] = React.useState(false);
	const showButtonCancel = () => {
		setshowButton(true);
		incrementBadge();
		setdisabled(true);
	};
	const hideButtons = () => {
		setshowButton(false);
		setdisabled(false);
		decrementBadge();
	};
	return (
		<Card
			style={styles.card}
			onPress={() => showDialog(Nombre)}
			elevation={3}
			mode='elevated'
			delayLongPress={3}
		>
			<Card.Title title={Nombre} style={styles.cardTitle} />
			<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
			<Card.Content>
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
