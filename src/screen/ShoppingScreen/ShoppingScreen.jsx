import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { Button, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
export const ShoppingScreen = ({ navigation }) => {
	return (
		<View style={{ padding: 15 }}>
			<View style={{ marginBottom: 20 }}>
				<Text variant='titleMedium'>Productos en carrito</Text>
			</View>
			<View style={styles.scrollContainer}>
				<SafeAreaView
					style={styles.safeContainer}
					edges={['left', 'right', 'bottom']}
				>
					<ScrollView>
						<ListCardComponent />
					</ScrollView>
				</SafeAreaView>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					onPress={() => navigation.navigate('PayMethod')}
					style={{ backgroundColor: '#9C7CFE', width: '100%' }}
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
		top: 580, // La distancia desde la parte superior de la pantalla
		marginHorizontal: 105, // Centra el botón horizontalmente
		alignItems: 'center',
	},
	scrollContainer: {
		height: 273,
	},
	safeContainer: {
		flex: 1,
		borderColor: 'gray',
		padding: 6,
		borderWidth: 0.2,
		borderRadius: 5,
	},
});
