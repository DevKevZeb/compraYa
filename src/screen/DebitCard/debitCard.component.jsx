import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import visa from '../../../assets/visa.png';
export const DebitCardComponent = () => {
	return (
		<View style={styles.container}>
			<View style={styles.box}>
				<View style={styles.containerVisa}>
					<Image source={visa} />
				</View>
				<TextInput
					mode='outlined'
					label='Numero de tarjeta'
					placeholder='Ingrese su numero de tarjeta'
					placeholderTextColor='gray'
					right={<TextInput.Icon icon='close' />}
					style={styles.numInput}
				/>
				<View style={styles.codeContainer}>
					<View style={styles.inputWrapper}>
						<TextInput
							mode='outlined'
							label='MM/YY'
							placeholder='mm/yy'
							placeholderTextColor='gray'
							right={<TextInput.Icon icon='close' />}
							style={styles.numInput}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<TextInput
							mode='outlined'
							label='Code'
							placeholder='000'
							placeholderTextColor='gray'
							right={<TextInput.Icon icon='close' />}
							style={styles.numInput}
						/>
					</View>
				</View>
				<TextInput
					label='Nombre de usuario'
					value='Ratoncito Perez'
					style={styles.numInput}
					right={<TextInput.Icon icon='pencil' />}
				/>
				<View style={styles.containerButtons}>
					<View style={styles.buttons}>
						<Button
							mode='contained'
							style={{ backgroundColor: '#9C7CFE' }}
							onPress={() => {}}
						>
							Guardar
						</Button>
					</View>
					<View style={styles.buttons}>
						<Button
							mode='contained'
							style={{ backgroundColor: '#9C7CFE' }}
							onPress={() => {}}
						>
							Eliminar
						</Button>
					</View>
				</View>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	box: {
		marginTop: 40,
		height: 400,
		width: 346,
		backgroundColor: '#EADDFF',
		borderRadius: 15,
	},
	containerVisa: {
		marginTop: 25,
		marginLeft: 25,
	},
	numInput: {
		marginTop: 13,
		marginHorizontal: 20,
	},
	codeContainer: {
		flexDirection: 'row',
		alignContent: 'space-between',
	},
	inputWrapper: {
		flex: 1,
		// marginHorizontal: ,
	},
	containerButtons: {
		flexDirection: 'row',
		alignContent: 'space-between',
		marginHorizontal: 30,
	},
	buttons: {
		marginTop: 30,
		marginHorizontal: 20,
	},
});
