import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { Button } from 'react-native-paper';
import Compraya3 from '../../../../assets/Compraya3.png';
export const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Image source={Compraya3} style={styles.imageContainer} />
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					onPress={() => navigation.navigate('SignIn')}
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
		width: '70%',
		backgroundColor: '#9C7CFE',
		marginBottom: 20,
	},
	imageContainer: {
		alignSelf: 'center',
		resizeMode: 'contain',
	},
});
