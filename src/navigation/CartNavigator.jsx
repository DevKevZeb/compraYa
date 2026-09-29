import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CardFormScreen } from '../screens/shop/CardFormScreen';
import { CartScreen } from '../screens/shop/CartScreen';
import { CheckoutScreen } from '../screens/shop/CheckoutScreen';
import { DeliveryMapScreen } from '../screens/shop/DeliveryMapScreen';
import { PaymentMethodsScreen } from '../screens/shop/PaymentMethodsScreen';
import { QrPaymentScreen } from '../screens/shop/QrPaymentScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const CartNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'My cart' }} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Checkout' }} />
    <Stack.Screen
      name="PaymentMethods"
      component={PaymentMethodsScreen}
      options={{ title: 'Payment methods' }}
    />
    <Stack.Screen name="CardForm" component={CardFormScreen} options={{ title: 'Card' }} />
    <Stack.Screen name="QrPayment" component={QrPaymentScreen} options={{ title: 'Pay with QR' }} />
    <Stack.Screen
      name="DeliveryMap"
      component={DeliveryMapScreen}
      options={{ title: 'Track order' }}
    />
  </Stack.Navigator>
);
