import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomNavigationBarProducts } from '../components/CustomNavigationBarProductos';

import { UserProfile } from '../screen/UserProfile/userProfile.component';

const Stack = createNativeStackNavigator();

export const UserProfileNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='User'
			screenOptions={({ navigation, route }) => ({
				header: (props) => (
					<CustomNavigationBarProducts
						{...props}
						navigation={navigation}
						route={route}
					/>
				),
			})}
		>
			<Stack.Screen
				name='UserProfile'
				component={UserProfile}
				options={{ headerTitle: 'Perfil de Usuario' }}
			/>
		</Stack.Navigator>
	);
};
