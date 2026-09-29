import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { DeliveryMapScreen } from '../screens/shop/DeliveryMapScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
    <Stack.Screen
      name="EditProfile"
      component={EditProfileScreen}
      options={{ title: 'Edit profile' }}
    />
    <Stack.Screen
      name="DeliveryMap"
      component={DeliveryMapScreen}
      options={{ title: 'Track order' }}
    />
  </Stack.Navigator>
);
