import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Feather from '@expo/vector-icons/Feather';
import { HomeScreen } from '../screen/HomeScreen/HomeScreen';
import { ShoppingNavigation } from './ShoppingNavigation';

const Tab = createMaterialBottomTabNavigator();
export const TabNavigation = () => {
	return (
		<Tab.Navigator barStyle={{ backgroundColor: '#9C7CFE' }}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: () => (
            <Feather name="home" size={24} color="black" />
					),
				}}
			/>
			<Tab.Screen
				name='Productos'
				component={ShoppingNavigation}
				options={{
					tabBarIcon: () => (
            <Feather name="shopping-bag" size={24} color="black" />

					),
				}}
			/>
      
		</Tab.Navigator>
	);
};
