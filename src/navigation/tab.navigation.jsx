import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ShoppingNavigation } from './shopping.navigation';
import { UserProfile } from '../screen/UserProfile/userProfile.component';
import { UserProfileNavigation } from './userProfile.navigation';

const Tab = createMaterialBottomTabNavigator();
export const TabNavigation = () => {
	return (
		<Tab.Navigator barStyle={{ backgroundColor: '#9C7CFE' }}>
			
			<Tab.Screen
				name='Productos'
				component={ShoppingNavigation}
				options={{
					tabBarIcon: () => (
            <Feather name="shopping-bag" size={24} color="black" />

					),
				}}
			/>
			<Tab.Screen
				name='Perfil'
				component={UserProfileNavigation}
				options={{
					tabBarIcon: () => (
						<FontAwesome6 name="circle-user" size={24} color="black" />

					),
				
				}}
			/>
      
		</Tab.Navigator>
	);
};
