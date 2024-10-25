import * as React from 'react';
import { View } from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { Button } from 'react-native-paper';

export const ShoppingScreen = ({ navigation }) => {
	return (
		<View style={{ padding: 15 }}>
			<ListCardComponent />
			<Button onPress={() => navigation.navigate('PayMethod')}>Continuar</Button>
		</View>
	);
};
