import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigation } from './auth.navigation';
import { TabNavigation } from './tab.navigation';

const RootStack = createNativeStackNavigator();

export const RootNavigation = () => {
	return (
		<RootStack.Navigator
			initialRouteName='root'
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name='login' component={AuthNavigation} />
			<RootStack.Screen
				name='Productos'
				component={TabNavigation}
                
			/>
		</RootStack.Navigator>
	);
};
