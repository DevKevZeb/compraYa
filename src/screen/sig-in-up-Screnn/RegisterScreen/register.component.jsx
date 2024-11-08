import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, TextInput, Button, Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CustomInputComponent } from '../../../components/CustomInput.component';
import { RegisterSchema } from '../../../models/form.model';

import face from '../../../../assets/face.png';
import google from '../../../../assets/google.png';
export const RegisterComponent = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		resolver: zodResolver(RegisterSchema),
		mode:'onBlur'

	});
	const onSubmit = (data) => {
		console.log(data);
		reset();
	};
	return (
		<View style={styles.container}>
			<Text variant='headlineSmall' style={styles.text}>
				!Bienvenido! Registrate para comenzar.
			</Text>
			<View style={styles.inputContainer}>
				<CustomInputComponent
					name='name'
					control={control}
					label='Nombre'
					placeholder='Nombre completo'
					type='text'
					error={errors.name}
				/>

				<CustomInputComponent
					name='email'
					control={control}
					label='Email'
					placeholder='Ingresa su email'
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
				<CustomInputComponent
					name='confirmPassword'
					control={control}
					label='Confirmar'
					placeholder='Confirmar Contraseña'
					secureTextEntry={true}
					type='password'
					error={errors.confirmPassword}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
				>
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
				<TouchableOpacity onPress={() => navigation.navigate('SigIn')}>
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
		width: '70%',
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
