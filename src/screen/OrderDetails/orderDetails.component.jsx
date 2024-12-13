import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, List } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';

export const OrderDetailsComponent = ({ navigation }) => {
	const {
		control,
		handleSubmit,
		setValue,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			address: '',
		},
	});
	return (
		<View style={styles.container}>
			<View style={styles.scrollContainer}>
				<Text variant='titleMedium' style={styles.text}>
					Productos en pedido
				</Text>
				<SafeAreaView
					style={styles.safeContainer}
					edges={['left', 'right', 'bottom']}
				>
					<ScrollView>
						{/*  todo:usar el customItemDetails para renderizar los productos seleccionados usan renderizado condicional */}
					</ScrollView>
				</SafeAreaView>
			</View>
			<Text variant='titleMedium' style={styles.text}>
				Direccion de envio
			</Text>
			<Controller
				name='address'
				control={control}
				rules={{
					required: 'Necesita ingresar una direccion',
					pattern: {
						value: /^[a-zA-Z0-9\s,.'-]{3,100}$/, //permite comas,guiones,apostrofes y puntos
						message: 'Debe ingresar una direccion',
					},
				}}
				render={({ field: { onChange, value } }) => (
					<TextInput
						mode='outlined'
						label='Direccion de envio'
						placeholder='Ingrese una direccion'
						keyboardType='text'
						value={value}
						onChangeText={onChange}
						style={styles.textInput}
						error={!!errors.address}
					/>
				)}
			/>
			{errors.address && (
				<Text style={styles.errorText}>{errors.address.message}</Text>
			)}
			<List.Item
				title='Metodo de pago'
				style={styles.listItem}
				right={() => (
					<Button
						mode='contained'
						style={styles.buttonItem}
						onPress={() => {
							navigation.navigate('PayMethod');
						}}
					>
						Selecionar
					</Button>
				)}
			/>
			<View style={styles.containerDetails}>
				<Text variant='titleMedium' style={styles.text}>
					Monto total
				</Text>
				<Text variant='titleSmall' style={styles.textDetail}>
					Costo Envio:
				</Text>
				<Text variant='titleSmall' style={styles.textDetail}>
					Fecha:
				</Text>
				<Text variant='titleSmall' style={styles.textDetail}>
					Subtotal:
				</Text>
				<Text variant='titleSmall' style={styles.textDetail}>
					Total:
				</Text>
			</View>
			<View style={styles.contendButton}>
				<Button
					mode='contained'
					style={styles.payButton}
					// loading={isPaying}
					// disabled={isPaying}
					// onPress={handlePayment}
				>
					Pagar
				</Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 10,
	},
	safeContainer: {
		flex: 1,
		borderColor: 'gray',
		padding: 6,
		borderWidth: 0.2,
		borderRadius: 5,
	},
	text: {
		paddingBottom: 10,
	},
	textInput: {
		marginBottom: 10,
	},
	errorText: {
		color: 'red',
		fontSize: 12,
		marginLeft: 20,
		marginBottom: 10,
	},
	listItem: {
		width: '100%',
		backgroundColor: '#EADDFF',

		borderRadius: 15,
		marginTop: 8,
	},
	buttonItem: {
		backgroundColor: '#9C7CFE',
	},
	containerDetails: {
		padding: 10,
	},
	textDetail: {
		paddingBottom: 5,
	},
	contendButton: {
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 20,
	},
	payButton: {
		width: '50%',
		backgroundColor: '#9C7CFE',
	},
});
