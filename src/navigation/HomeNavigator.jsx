import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { ProductsScreen } from '../screens/shop/ProductsScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
