import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductScreen } from '../screen/ProductScreen/product.screen';
import { ShoppingScreen } from '../screen/ShoppingScreen/ShoppingScreen';
import { CustomNavigationBarProducts } from '../components/CustomNavigationBarProductos';
import { PayMethodComponent } from '../screen/PayMethod/payMethod.component';
import { DebitCardComponent } from '../screen/DebitCard/debitCard.component';
import { QrMethodComponent } from '../screen/QrMethod/qrMethod.component';

const Stack = createNativeStackNavigator();
export const ShoppingNavigation = () => {
	return (
		<Stack.Navigator
			initialRouteName='Productos'
			screenOptions={{
				header: (props) => (
					<CustomNavigationBarProducts {...props} nextRoute='Carrito' />
				),

			}}
		>
			<Stack.Screen
				name='listProducto'
				component={ProductScreen}
				options={{ headerTitle: 'Productos'}}
			/>
			<Stack.Screen
				name='Carrito'
				component={ShoppingScreen}
				options={{ headerTitle: 'Carrito de Compras' }}
			/>
			<Stack.Screen
				name='PayMethod'
				component={PayMethodComponent}
				options={{ headerTitle: 'Metodo de Pago' }}
			/>
			<Stack.Screen
				name='QrMethod'
				component={QrMethodComponent}
				options={{ headerTitle: 'Pago por Qr' }}
			/>
			<Stack.Screen
				name='DebitCard'
				component={DebitCardComponent}
				options={{ headerTitle: 'Agregar Tarjeta' }}
			/>
		</Stack.Navigator>
	);
};
