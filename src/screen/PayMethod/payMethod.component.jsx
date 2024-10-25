import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

export const PayMethodComponent = ({navigation}) => {
	return (
		<View>
			<Text>PayMethodComponent</Text>
			<Button onPress={() => navigation.navigate('DebitCard')}>Continuar</Button>

		</View>
	);
};
