import React from 'react';
import { View ,StyleSheet} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button ,Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import {CustomInputComponent} from '../../components/CustomInput.component'
import { DataUserSchema } from '../../models/form.model';

export const DataUserProfile = () => {
	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
		},
		resolver: zodResolver(DataUserSchema),
		mode: 'onBlur',
	});
	const onSubmit = (data) => {
		console.log(data);
		reset();
	};
	return (
		<View style={styles.container}>
			<View style={styles.inputContainer}>
                <View style={{textAlign:'left'}}>
                    <Text variant='headlineSmall' style={{marginTop:10}}>Actualiza tus datos por favor.</Text>
                </View>
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
					placeholder='Ingresa tu email'
					type='email'
					error={errors.email}
				/>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					mode='contained'
					style={styles.button}
					onPress={handleSubmit(onSubmit)}
					// loading={loading}
				>
					Actualizar Datos
				</Button>
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
});
