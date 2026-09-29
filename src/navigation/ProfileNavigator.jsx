import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { EditProfileScreen } from '../screens/profile/EditProfileScreen';
import { OrderDetailScreen } from '../screens/profile/OrderDetailScreen';
import { OrdersScreen } from '../screens/profile/OrdersScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { CardFormScreen } from '../screens/shop/CardFormScreen';
import { DeliveryMapScreen } from '../screens/shop/DeliveryMapScreen';
import { PaymentMethodsScreen } from '../screens/shop/PaymentMethodsScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const ProfileNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
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
      name="PaymentMethods"
      component={PaymentMethodsScreen}
      options={{ title: 'Payment methods' }}
    />
    <Stack.Screen name="CardForm" component={CardFormScreen} options={{ title: 'Card' }} />
    <Stack.Screen
      name="DeliveryMap"
      component={DeliveryMapScreen}
      options={{ title: 'Track order' }}
    />
  </Stack.Navigator>
);
