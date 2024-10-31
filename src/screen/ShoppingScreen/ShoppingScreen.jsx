import * as React from 'react';
import { View ,StyleSheet} from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { Button } from 'react-native-paper';

export const ShoppingScreen = ({ navigation }) => {
	return (
		<View style={{ padding: 15 }}>
			<ListCardComponent />
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					onPress={() => navigation.navigate('PayMethod')}
					style={{ backgroundColor: '#9C7CFE' }}
				>
					Continuar
				</Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	buttonContainer: {
		position: 'absolute', // Posiciona el botón de manera absoluta
		width: '50%',
		top: 555, // La distancia desde la parte superior de la pantalla
		marginHorizontal:105, // Centra el botón horizontalmente 
		alignItems: 'center',
	  },
})
