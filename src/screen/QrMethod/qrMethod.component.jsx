import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import myQr from '../../../assets/myQr.png';
export const QrMethodComponent = () => {
	return (
		<View>
			<Text variant='titleMedium' style={styles.containerText}>
				Qr generado
			</Text>
			<View style={styles.container}>
				<Image source={myQr} style={{ marginTop: 13 }} />
				<Button
					mode='contained'
					style={{ marginTop: 20, backgroundColor: '#9C7CFE' }}
				>
					Descargar Codigo Qr
				</Button>
				<Button
					mode='contained'
					style={{ marginTop: 15, backgroundColor: '#9C7CFE' }}
				>
					Ya realize el pago
				</Button>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerText: {
		marginLeft: 30,
		marginTop: 20,
	},
});
