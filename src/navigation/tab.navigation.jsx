import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ShoppingNavigation } from './shopping.navigation';
import { UserProfileNavigation } from './userProfile.navigation';

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#9C7CFE' },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#3D2A80',
      }}
    >
      <Tab.Screen
        name="Productos"
        component={ShoppingNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={UserProfileNavigation}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
