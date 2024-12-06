import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

export const UserProfile = ({navigation}) => {
	return (
		<View style={style.container}>
			<Text variant='headlineSmall'>Nombre Completo:</Text>
			<Text variant='titleMedium' style={style.textContent}>
				Ratoncito Perez
			</Text>

			<Text variant='headlineSmall'>Correo Electronico:</Text>
			<Text variant='titleMedium' style={style.textContent}>
				ratoncito@gmail.com
			</Text>
			<TouchableOpacity onPress={()=> navigation.navigate('DataUser')}>
				<Text variant='bodyMedium' style={style.textLink}>
					desea actualizar sus datos?
				</Text>
			</TouchableOpacity>
			<TouchableOpacity>
				<Text variant='bodyMedium' style={style.textLink}>
					cerrar sesion
				</Text>
			</TouchableOpacity>
		</View>
	);
};

const style = StyleSheet.create({
	container: {
		padding: 20,
		flexDirection: 'column',
	},
	textLink: {
		color: '#0866FF',
		marginTop: 15,
	},
	textContent: {
		marginTop: 10,
		marginBottom: 10,
	},
});
