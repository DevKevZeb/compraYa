import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppHeader } from '../components/AppHeader';
import { CardFormScreen } from '../screens/shop/CardFormScreen';
import { DeliveryMapScreen } from '../screens/shop/DeliveryMapScreen';
import { CheckoutScreen } from '../screens/shop/CheckoutScreen';
import { PaymentMethodsScreen } from '../screens/shop/PaymentMethodsScreen';
import { ProductsScreen } from '../screens/shop/ProductsScreen';
import { QrPaymentScreen } from '../screens/shop/QrPaymentScreen';
import { CartScreen } from '../screens/shop/CartScreen';

const Stack = createNativeStackNavigator();
export const ShopNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Products"
      screenOptions={({ navigation, route }) => ({
        header: (props) => <AppHeader {...props} navigation={navigation} route={route} />,
      })}
    >
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={{ headerTitle: 'Productos' }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ headerTitle: 'Carrito de Compras' }}
      />
      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethodsScreen}
        options={{ headerTitle: 'Metodo de Pago' }}
      />
      <Stack.Screen
        name="QrPayment"
        component={QrPaymentScreen}
        options={{ headerTitle: 'Pago por Qr' }}
      />
      <Stack.Screen
        name="CardForm"
        component={CardFormScreen}
        options={{ headerTitle: 'Tarjeta debito' }}
      />
      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ headerTitle: 'Pedido' }}
      />
      <Stack.Screen
        name="DeliveryMap"
        component={DeliveryMapScreen}
        options={{ headerTitle: 'Mapa de Entrega' }}
      />
    </Stack.Navigator>
  );
};
