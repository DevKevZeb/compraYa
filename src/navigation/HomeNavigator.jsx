import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductsScreen } from '../screens/shop/ProductsScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);
