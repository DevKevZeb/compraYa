import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomNavigationBarProducts } from "../components/CustomNavigationBarProductos";
import { DebitCardComponent } from "../screen/DebitCard/debitCard.component";
import { DeliveryMapComponent } from "../screen/DeliveryMap/DeliveryMapComponent";
import { OrderDetailsComponent } from "../screen/OrderDetails/orderDetails.component";
import { PayMethodComponent } from "../screen/PayMethod/payMethod.component";
import { ProductScreen } from "../screen/ProductScreen/product.screen";
import { QrMethodComponent } from "../screen/QrMethod/qrMethod.component";
import { ShoppingScreen } from "../screen/ShoppingScreen/ShoppingScreen";

const Stack = createNativeStackNavigator();
export const ShoppingNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Productoss"
      screenOptions={({ navigation, route }) => ({
        header: (props) => (
          <CustomNavigationBarProducts
            {...props}
            navigation={navigation}
            route={route}
          />
        ),
      })}
    >
      <Stack.Screen
        name="listProducto"
        component={ProductScreen}
        options={{ headerTitle: "Productos" }}
      />
      <Stack.Screen
        name="Carrito"
        component={ShoppingScreen}
        options={{ headerTitle: "Carrito de Compras" }}
      />
      <Stack.Screen
        name="PayMethod"
        component={PayMethodComponent}
        options={{ headerTitle: "Metodo de Pago" }}
      />
      <Stack.Screen
        name="QrMethod"
        component={QrMethodComponent}
        options={{ headerTitle: "Pago por Qr" }}
      />
      <Stack.Screen
        name="DebitCard"
        component={DebitCardComponent}
        options={{ headerTitle: "Tarjeta debito" }}
      />
      <Stack.Screen
        name="OrderDetails"
        component={OrderDetailsComponent}
        options={{ headerTitle: "Pedido" }}
      />
      <Stack.Screen
        name="DeliveryMap"
        component={DeliveryMapComponent}
        options={{ headerTitle: "Mapa de Entrega" }}
      />
    </Stack.Navigator>
  );
};
