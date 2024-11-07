import React from 'react';
import { View, TouchableOpacity, StyleSheet ,Image} from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import face from '../../../../assets/face.png';
import google from '../../../../assets/google.png';
export const RegisterComponent = ({navigation}) => {
	return (
		<View style={styles.container}>
			<Text variant='headlineSmall' style={styles.text}>
				!Bienvenido! Registrate para comenzar.
			</Text>
			<View style={styles.inputContainer}>
				<TextInput
					mode='outlined'
					label='Nombre'
					placeholder='Nombre completo'
					placeholderTextColor='gray'
					style={styles.input}
				/>
				<TextInput
					mode='outlined'
					label='Email'
					placeholder='Ingresa su email'
					placeholderTextColor='gray'
					style={styles.input}
				/>
				<TextInput
					mode='outlined'
					label='Contraseña'
					placeholder='Contraseña'
					placeholderTextColor='gray'
					style={styles.input}
				/>
				<TextInput
					mode='outlined'
					label='Confirmar'
					placeholder='Confirmar Contraseña'
					placeholderTextColor='gray'
					style={styles.input}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button mode='contained' style={styles.button} onPress={() => {}}>
					Registrarte
				</Button>
			</View>
			<Divider horizontalInset={true} bold={true} style={{ marginTop: 20 }} />
			<Text variant='titleMedium' style={styles.text}>
				O ingresa con
			</Text>
			<View style={styles.socialContainer}>
				<TouchableOpacity onPress={() => {}}>
					<Image source={face} on />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<Image source={google} />
				</TouchableOpacity>
			</View>
			<View style={styles.textContainer}>
				<Text variant='titleSmall'>Ya tienes una cuenta? </Text>
				<TouchableOpacity onPress={()=>navigation.navigate('SigIn')}>
					<Text variant='titleSmall' style={{ color: '#0866FF' }}>
						Ingresa ahora
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		height: '100%',
		backgroundColor: '#EADDFF',
	},
	text: {
		textAlign: 'center',
	},
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: '80%',
		marginTop: 30,
	},
	button: {
		backgroundColor: '#9C7CFE',
		marginTop: 40,
		width: '50%',
	},
	buttonContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	socialContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		gap: 50,
		marginTop: 40,
		marginBottom: 60,
	},
	textContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		marginBottom: 30,
	},
});
