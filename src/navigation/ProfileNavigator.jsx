import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { OrderDetailScreen } from '../screens/profile/OrderDetailScreen';
import { OrdersScreen } from '../screens/profile/OrdersScreen';
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
    <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'My orders' }} />
    <Stack.Screen
      name="OrderDetail"
      component={OrderDetailScreen}
      options={{ title: 'Order details' }}
    />
    <Stack.Screen
      name="DeliveryMap"
      component={DeliveryMapScreen}
      options={{ title: 'Track order' }}
    />
  </Stack.Navigator>
);
