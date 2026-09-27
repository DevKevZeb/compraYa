import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { DeliveryMapScreen } from '../screens/shop/DeliveryMapScreen';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={({ navigation, route }) => ({
        header: (props) => <AppHeader {...props} navigation={navigation} route={route} />,
      })}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerTitle: 'Perfil de Usuario' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerTitle: 'Actualiza tus datos' }}
      />
      <Stack.Screen
        name="DeliveryMap"
        component={DeliveryMapScreen}
        options={{ headerTitle: 'Seguimiento del pedido' }}
      />
    </Stack.Navigator>
  );
};
