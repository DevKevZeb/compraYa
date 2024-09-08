import React from 'react';
import { Image } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';

export const DialogComponent = ({ visible, hideDialog, detailProduct }) => {
	console.log(detailProduct);
	const { nombre_producto, url_imagen } = detailProduct;
	return (
		<Portal>
			<Dialog visible={visible} theme={{ colors: { background: '#BEA8FF' } }}>
				<Dialog.Title>{nombre_producto}</Dialog.Title>
				<Dialog.Content>
					<Image
						source={{ uri: url_imagen }}
						style={{
							width: '100%',
							height: 150,
							alignSelf: 'center',
							marginBottom: 10,
						}}
					/>
					<Text variant='labelLarge' style={{ fontSize: 18 }}>
						This is simple dialog
					</Text>
					<Text variant='bodyMedium'>This is simple dialog</Text>
					<Text variant='bodyMedium'>This is simple dialog</Text>
					<Text variant='bodyMedium'>This is simple dialog</Text>
					<Text variant='bodyMedium'>This is simple dialog</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog}>Cancel</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
