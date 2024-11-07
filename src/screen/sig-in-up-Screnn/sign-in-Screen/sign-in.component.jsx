import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CustomInputComponent } from '../../../components/CustomInput.component';
import { SigInSchema } from '../../../models/form.model';
import face from '../../../../assets/face.png';
import google from '../../../../assets/google.png';
export const SignInComponent = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(SigInSchema),
		mode:'onBlur'
	});
	const onSubmit = (data) => {
		navigation.navigate('Productos');
		console.log(data);
		reset();
	};
	return (
		<View style={styles.container}>
			<Text variant='headlineSmall' style={styles.text}>
				Bienvenido de nuevo todo lo que buscas lo encuentras aqui.
			</Text>
			<View style={styles.inputContainer}>
				<CustomInputComponent
					name='email'
					control={control}
					label='Email'
					placeholder='Ingresa tu email'
					type='email'
					error={errors.email}
				/>

				<CustomInputComponent
					name='password'
					control={control}
					label='Contraseña'
					placeholder='Ingrese tu contraseña'
					secureTextEntry={true}
					type='password'
					error={errors.password}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate('ForgotPassword')}
					style={styles.textInput}
				>
					<Text variant='titleSmall'>Olvidaste tu contrasena?</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
				>
					Ingresar
				</Button>
			</View>
			<Divider horizontalInset={true} bold={true} style={{ marginTop: 100 }} />
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
				<Text variant='titleSmall'>No tienens cuenta? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Register')}>
					<Text variant='titleSmall' style={{ color: '#0866FF' }}>
						Registrate ahora
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#EADDFF',
		height: '100%',
	},
	text: {
		textAlign: 'center',
	},
	inputContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	input: {
		width: '80%',
		marginTop: 30,
	},
	textInput: {
		width: '80%',
		marginTop: 10,
		textDecorationLine: 'underline',
		marginLeft: 309,
	},
	button: {
		backgroundColor: '#9C7CFE',
		marginTop: 75,
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
