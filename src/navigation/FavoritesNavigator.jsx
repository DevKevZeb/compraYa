import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../screens/shop/FavoritesScreen';
import { ProductDetailScreen } from '../screens/shop/ProductDetailScreen';
import { stackScreenOptions } from './stackOptions';

const Stack = createNativeStackNavigator();

export const FavoritesNavigator = () => (
  <Stack.Navigator screenOptions={stackScreenOptions}>
    <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favorites' }} />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetailScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);
