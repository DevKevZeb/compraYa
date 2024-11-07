import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import logo from '../../../../assets/logo.png';
export const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image source={logo} />
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					onPress={() => navigation.navigate('SigIn')}
					style={styles.button}
				>
					Ingresar
				</Button>
				<Button
					mode='contained'
					onPress={() => navigation.navigate('Register')}
					style={styles.button}
				>
					Registrate
				</Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eaddff',
		height: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	buttonContainer: {
		alignItems: 'center',
	},
	button: {
		width: '50%',
		backgroundColor: '#9C7CFE',
		marginBottom: 10,
	},
});
