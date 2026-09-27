import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ShopNavigator } from './ShopNavigator';
import { Platform } from 'react-native';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();

// On the web the default tab bar height clips the labels; native keeps the
// automatic height so it respects the device's safe area.
const tabBarStyle = Platform.select({
  web: { backgroundColor: '#9C7CFE', height: 64, paddingTop: 6, paddingBottom: 8 },
  default: { backgroundColor: '#9C7CFE' },
});

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#3D2A80',
      }}
    >
      <Tab.Screen
        name="Productos"
        component={ShopNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="shopping-bag" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="circle-user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
