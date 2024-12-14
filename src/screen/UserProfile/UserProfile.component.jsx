import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../../../lib/initSupaBase";
import { CustomListItemComponent } from "../../components/customListItem.component";
import { useUserStore } from "../../Stores/user.store";

export const UserProfile = ({ navigation }) => {
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const fetchOrderHistory = useUserStore((state) => state.fetchOrderHistory);
  const orders = useUserStore((state) => state.orders);
  const orderHistory = useUserStore((state) => state.orderHistory);
  const updateOrderStatus = useUserStore((state) => state.updateOrderStatus);

  useEffect(() => {
    fetchUserOrders();
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      orders.forEach((order) => {
        updateOrderStatus(order.orden_id);
      });
    }, 30000); // 1 minuto

    return () => clearTimeout(timer);
  }, [orders]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    clearUser();
    navigation.navigate("SignIn");
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall">Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineSmall">Nombre Completo:</Text>
        <Text variant="titleMedium" style={styles.textContent}>
          {user.nombre_usuario}
        </Text>

        <Text variant="headlineSmall">Correo Electronico:</Text>
        <Text variant="titleMedium" style={styles.textContent}>
          {user.email}
        </Text>
      </View>
      <View style={styles.scrollContainer}>
        <Text variant="headlineSmall" style={styles.text}>
          Pedidos en curso
        </Text>
        <SafeAreaView
          style={styles.safeContainer}
          edges={["left", "right", "bottom"]}
        >
          <ScrollView>
            {orders.map((order) => (
              <CustomListItemComponent key={order.numero_seguimiento}>
                <View style={styles.history}>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Numero de seguimiento:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.numero_seguimiento}
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Direccion envio:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.direccion_envio}
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Monto Total:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.monto_total} Bs
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Estado:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.estado}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("DeliveryMap", {
                          direccion_envio: order.direccion_envio,
                        })
                      }
                      style={styles.linkPedido}
                    >
                      <Text variant="bodyMedium" style={styles.textLink}>
                        ver en camino
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </CustomListItemComponent>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
      <View style={styles.scrollContainer}>
        <Text variant="headlineSmall" style={styles.text}>
          Historial pedidos
        </Text>
        <SafeAreaView
          style={styles.safeContainer}
          edges={["left", "right", "bottom"]}
        >
          <ScrollView>
            {orderHistory.map((order) => (
              <CustomListItemComponent key={order.numero_seguimiento}>
                <View style={styles.history}>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Numero de seguimiento:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.numero_seguimiento}
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Direccion envio:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.direccion_envio}
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Monto Total:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.monto_total} Bs
                    </Text>
                  </View>
                  <View style={styles.historyText}>
                    <Text variant="titleMedium">Estado:</Text>
                    <Text variant="titleSmall" style={styles.valueText}>
                      {order.estado}
                    </Text>
                  </View>
                </View>
              </CustomListItemComponent>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("DataUserProfile")}>
        <Text variant="bodyMedium" style={styles.textLink}>
          ¿Desea actualizar sus datos?
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignOut}>
        <Text variant="bodyMedium" style={styles.textLink}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  textLink: {
    color: "#0866FF",
    marginTop: 15,
  },
  textContent: {
    marginTop: 10,
    marginBottom: 10,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 10,
  },
  safeContainer: {
    flex: 1,
    borderColor: "gray",
    padding: 6,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  text: {
    paddingBottom: 10,
  },
  history: {
    flexDirection: "column",
    paddingTop: 5,
  },
  historyText: {
    flexDirection: "row",
  },
  valueText: {
    paddingTop: 3,
  },
  linkPedido: {
    marginLeft: 100,
    paddingTop: 0,
  },
});
