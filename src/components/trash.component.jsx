import React, { useState } from 'react';
import { View } from 'react-native';
import {
	Dialog,
	Portal,
	Text,
	Button,
	List,
	Divider,
} from 'react-native-paper';
import { useProduct } from '../Stores/global.store';
export const TrashComponent = (isVisible) => {
	console.log('en trash:', isVisible);
	const [visible, setvisible] = useState(isVisible);
	const productSelected = useProduct((state) => state.productSelected);
	const hideDialog = () => {
		setvisible(false);
	};
	return (
		<Portal>
			<Dialog visible={visible} theme={{ colors: { background: '#BEA8FF' } }}>
				<Dialog.Title>Se Eliminara</Dialog.Title>
				<Dialog.Content>
					<List.Section>
						{productSelected.map((product, index) => (
							<View
								style={{ flexDirection: 'row', marginLeft: 17 }}
								key={product['producto_id']}
							>
								<Text variant='labelLarge'>{product['nombre_producto']}</Text>
								{index < productSelected.length - 1 && <Divider />}
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
