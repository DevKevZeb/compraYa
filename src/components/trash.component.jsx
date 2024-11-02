import React, { useState } from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import {
	Dialog,
	Portal,
	Text,
	Button,
	List,
	Divider,
	Checkbox,
} from 'react-native-paper';
import { useBadgeStore, useProduct } from '../Stores/global.store';
export const TrashComponent = ({ isVisible, hideDialog }) => {
	
	const updateBadge = useBadgeStore((state) => state.updateBadge);
	const productSelected = useProduct((state) => state.productSelected);
	const updateCheckedProduct = useProduct(
		(state) => state.updateCheckedProduct
	);
	const removeCheckProduct = useProduct((state) => state.removeCheckProduct);
	const handleCheck = (idProduct) => {
		updateCheckedProduct(idProduct); // Cambia el estado del checkbox
	};
	const removeProducts = () => {
		removeCheckProduct();
		hideDialog();
		updateBadge(productSelected.length);
		console.log(productSelected.length);

	};
	return (
		<TouchableWithoutFeedback>
			<Portal>
				<Dialog
					visible={isVisible}
					theme={{ colors: { background: '#BEA8FF' } }}
					dismissable={false}
				>
					<Dialog.Title style={{ paddingLeft: 10 }}>Se Eliminara</Dialog.Title>
					<Dialog.Content>
						<List.Section>
							{productSelected.map((product, index) => (
								<View key={index}>
									<List.Item
										title={product['nombre_producto']}
										key={product['producto_id']}
										right={(props) => (
											<View
												style={{ flexDirection: 'row', alignItems: 'center' }}
											>
												<Text style={{ marginRight: 10 }}>
													{product.cantidad}
												</Text>
												<Checkbox
													status={
														product['itemCheked'] ? 'checked' : 'unchecked'
													}
													onPress={() => handleCheck(product['producto_id'])}
												/>
											</View>
										)}
									/>
									{index < productSelected.length - 1 && <Divider />}
								</View>
							))}
						</List.Section>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDialog}>Cancel</Button>
						<Button onPress={removeProducts}>Aceptar</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</TouchableWithoutFeedback>
	);
};
