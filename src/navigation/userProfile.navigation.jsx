import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CustomNavigationBarProducts } from '../components/CustomNavigationBarProductos';
import { UserProfile } from '../screen/UserProfile/UserProfile.component';
import { DataUserProfile } from '../screen/UserProfile/DataUserProfile.component';
import { DeliveryMapComponent } from '../screen/DeliveryMap/DeliveryMapComponent';


const Stack = createNativeStackNavigator();

export const UserProfileNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='UserProfile'
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
			<Stack.Screen
				name='DataUserProfile'
				component={DataUserProfile}
				options={{ headerTitle: 'Actualiza tus datos' }}
			/>
			<Stack.Screen
				name='DeliveryMap'
				component={DeliveryMapComponent}
				options={{ headerTitle: 'Dirección de envio' }}
			/>
		</Stack.Navigator>
	);
};
