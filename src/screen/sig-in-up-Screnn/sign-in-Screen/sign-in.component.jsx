import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import face from '../../../../assets/face.png';
import google from '../../../../assets/google.png';
import { supabase } from '../../../../lib/initSupaBase';
import { CustomInputComponent } from '../../../components/CustomInput.component';
import { SigInSchema } from '../../../models/form.model';
import { useUserStore } from '../../../Stores/user.store';

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
		mode: 'onBlur',
	});

	const [loading, setLoading] = useState(false);
	const setUser = useUserStore((state) => state.setUser);

	const onSubmit = async (data) => {
		setLoading(true);
		const { email, password } = data;

		const { data: signInData, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			setLoading(false);
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Correo o contraseña invalidos. Por favor, inténtalo de nuevo.',
				duration: 1000,
			});
			return;
		}

		// Obtener información adicional del usuario desde la tabla "usuarios"
		const { data: userData, error: userError } = await supabase
			.from('usuarios')
			.select('usuario_id,nombre_usuario, correo_electronico')
			.eq('correo_electronico', email)
			.single();

		setLoading(false);

		if (userError) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'No se pudo obtener la información del usuario.',
				duration: 1000,
			});
			return;
		}

		// Almacenar la información del usuario en el estado global
		setUser({
			userId: userData.usuario_id,
			email: signInData.user.email,
			nombre_usuario: userData.nombre_usuario,
		});

		Toast.show({
			type: 'success',
			text1: 'Success',
			text2: 'Inicio de sesión exitoso',
			duration: 1000,
		});
		navigation.navigate('ListProductos'); // Asegúrate de que esta ruta exista
		reset();
	};

	return (
		<View style={styles.container}>
			<Text variant='headlineSmall' style={styles.text}>
				Bienvenido de nuevo todo lo que buscas lo encuentras aquí.
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
					placeholder='Ingresa tu contraseña'
					secureTextEntry={true}
					type='password'
					error={errors.password}
				/>
				<TouchableOpacity
					onPress={() => navigation.navigate('ForgotPassword')}
					style={styles.textInput}
				>
					<Text variant='titleSmall'>¿Olvidaste tu contraseña?</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
					loading={loading}
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
					<Image source={face} />
				</TouchableOpacity>
				<TouchableOpacity onPress={() => {}}>
					<Image source={google} />
				</TouchableOpacity>
			</View>
			<View style={styles.textContainer}>
				<Text variant='titleSmall'>¿No tienes cuenta? </Text>
				<TouchableOpacity onPress={() => navigation.navigate('Register')}>
					<Text variant='titleSmall' style={{ color: '#0866FF' }}>
						Regístrate ahora
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#eaddff',
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
