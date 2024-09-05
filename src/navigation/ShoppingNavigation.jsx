import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductScreen } from '../screen/ProductScreen/ProductScreen';
import { ShoppingScreen } from '../screen/ShoppingScreen/ShoppingScreen';
import {  CustomNavigationBarProducts } from '../components/CustomNavigationBarProductos';

const Stack = createNativeStackNavigator();
export const ShoppingNavigation = () => {
	return (
		<Stack.Navigator
			// initialRouteName='Producto'
			screenOptions={{
				header: (props) => <CustomNavigationBarProducts{...props} />,
			}}
		>
			<Stack.Screen
				name='Producto'
				component={ProductScreen}
				options={{ title: 'Productos' }}

			/>
			<Stack.Screen
				name='Carrito'
				component={ShoppingScreen}
				options={{ title: 'Carrito de Compras' }}
			/>
		</Stack.Navigator>
	);
};
