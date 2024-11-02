import React from 'react';
import { Button, Text, List, Checkbox } from 'react-native-paper';
import { View, StyleSheet, Image } from 'react-native';
import qrImage from '../../../assets/qrImage.png';
import visa from '../../../assets/visa.png';

export const PayMethodComponent = ({ navigation }) => {
	const isDebitCard = true;
	return (
		<View>
			<Text style={styles.containerText} variant='titleMedium'>
				Tarjetas de credito y debito
			</Text>

			<List.Item
				title='Nueva Tarjeta'
				style={styles.listItem}
				right={(props) => (
					<Button
						mode='contained'
						style={styles.buttonItem}
						onPress={() => navigation.navigate('DebitCard')}
					>
						Agregar
					</Button>
				)}
			/>
			{isDebitCard && (
				<View style={styles.debitCard}>
					<View
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							alignContent: 'space-between',
						}}
					>
						<View style={styles.myVisa}>
							<Image source={visa} />
						</View>
						<View style={styles.checkCardDebit}>
							<Checkbox />
						</View>
					</View>
					<Text style={styles.textCardDebit} variant='titleMedium'>
						**** **** **** 12345
					</Text>
					<Button
						mode='contained'
						style={styles.buttonCardDebit}
						onPress={() => navigation.navigate('DebitCard')}
					>
						Editar
					</Button>
				</View>
			)}
			<Text variant='titleMedium' style={styles.containerText}>
				Otros metodos de pago
			</Text>
			<List.Item
				title='Pago por Qr'
				style={styles.listItem}
				right={(props) => <Image source={qrImage} />}
				onPress={() => navigation.navigate('QrMethod')}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	containerText: {
		marginLeft: 30,
		marginTop: 20,
	},
	listItem: {
		backgroundColor: '#EADDFF',
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 15,
		marginTop: 15,
	},
	buttonItem: {
		backgroundColor: '#9C7CFE',
	},

	debitCard: {
		width: 353,
		height: 185,
		backgroundColor: '#EADDFF',
		marginTop: 13,
		marginLeft: 20,
		marginRight: 20,
		borderRadius: 15,
	},
	myVisa: {
		marginTop: 20,
		marginLeft: 20,
	},
	checkCardDebit: {
		marginHorizontal: 200,
	},
	textCardDebit: {
		marginLeft: 20,
		marginTop: 15,
	},
	buttonCardDebit: {
		width: '40%',
		backgroundColor: '#9C7CFE',
		marginLeft: 20,
		marginTop: 6,
		padding: 0,
	},
});
