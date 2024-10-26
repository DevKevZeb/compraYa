import * as React from 'react';
import { View } from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { Button } from 'react-native-paper';

export const ShoppingScreen = ({ navigation }) => {
	return (
		<View style={{ padding: 15 }}>
			<ListCardComponent />
			<Button
				mode='contained'
				onPress={() => navigation.navigate('PayMethod')}
				style={{backgroundColor:"#9C7CFE"}}
			>
				Continuar
			</Button>
		</View>
	);
};
