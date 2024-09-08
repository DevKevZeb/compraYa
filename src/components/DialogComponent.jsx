import React from 'react';
import { Image, View } from 'react-native';
import { Dialog, Portal, Text, Button, List } from 'react-native-paper';

export const DialogComponent = ({ visible, hideDialog, detailProduct }) => {
	console.log('producto detallado: ', detailProduct);
	const { nombre_producto, url_imagen, atributos_producto } = detailProduct;
	console.log('mis atributos:', atributos_producto);
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
					<List.Section>
						<List.Subheader style={{fontSize:20,fontWeith:'bold'}}>Caracterisitcas</List.Subheader>
						{atributos_producto.map((atributo) => (
							<View style={{flexDirection:'row',marginLeft:17}}>
								<Text variant='labelLarge'>{atributo['nombre_atributo']} :</Text>
								<Text variant='bodyMedium'>  {atributo['valor_atributo']}</Text>
							</View>
						))}
					</List.Section>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog}>Cancel</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
