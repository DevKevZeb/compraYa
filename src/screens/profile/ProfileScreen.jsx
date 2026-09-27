import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../lib/supabase';
import { OrderCard } from '../../components/OrderCard';
import { isDemoAccount } from '../../services/auth';
import { useUserStore } from '../../stores/user.store';

export const ProfileScreen = ({ navigation }) => {
  const user = useUserStore((state) => state.user);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const fetchOrderHistory = useUserStore((state) => state.fetchOrderHistory);
  const orders = useUserStore((state) => state.orders);
  const orderHistory = useUserStore((state) => state.orderHistory);
  const updateOrderStatus = useUserStore((state) => state.updateOrderStatus);

  // Orders are placed from the shopping tab, so refresh whenever this tab is shown.
  useFocusEffect(
    useCallback(() => {
      if (user) {
        fetchUserOrders();
        fetchOrderHistory();
      }
    }, [user, fetchUserOrders, fetchOrderHistory])
  );

  const handleTrack = (order) =>
    navigation.navigate('DeliveryMap', { direccion_envio: order.direccion_envio });

  const handleConfirm = async (order) => {
    const { error } = await updateOrderStatus(order.orden_id, 'entregado');
    Toast.show(
      error
        ? { type: 'error', text1: 'Error', text2: error.message }
        : { type: 'success', text1: 'Pedido entregado', text2: '¡Gracias por tu compra!' }
    );
  };

  const handleSignOut = async () => {
    // The root navigator returns to the auth flow when the session ends.
    await supabase.auth.signOut();
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text variant="headlineSmall">Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headlineSmall">Nombre Completo:</Text>
      <Text variant="titleMedium" style={styles.textContent}>
        {user.nombre_usuario}
      </Text>

      <Text variant="headlineSmall">Correo Electrónico:</Text>
      <Text variant="titleMedium" style={styles.textContent}>
        {user.email}
      </Text>

      <Text variant="headlineSmall" style={styles.sectionTitle}>
        Pedidos en curso
      </Text>
      {orders.length === 0 ? (
        <Text style={styles.empty}>No tienes pedidos en curso.</Text>
      ) : (
        orders.map((order) => (
          <OrderCard
            key={order.orden_id}
            order={order}
            onTrack={handleTrack}
            onConfirm={handleConfirm}
          />
        ))
      )}

      <Text variant="headlineSmall" style={styles.sectionTitle}>
        Historial de pedidos
      </Text>
      {orderHistory.length === 0 ? (
        <Text style={styles.empty}>Aún no tienes pedidos entregados.</Text>
      ) : (
        orderHistory.map((order) => <OrderCard key={order.orden_id} order={order} />)
      )}

      {/* The shared demo account stays read-only so every visitor sees the same profile. */}
      {isDemoAccount(user.email) ? (
        <Text variant="bodySmall" style={styles.demoNotice}>
          Estás usando la cuenta demo. Regístrate para editar tus datos.
        </Text>
      ) : (
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text variant="bodyMedium" style={styles.textLink}>
            ¿Desea actualizar sus datos?
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={handleSignOut}>
        <Text variant="bodyMedium" style={styles.textLink}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 15,
    paddingBottom: 40,
  },
  demoNotice: {
    marginTop: 15,
    color: '#666',
  },
  textLink: {
    color: '#0866FF',
    marginTop: 15,
  },
  textContent: {
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    marginTop: 16,
  },
  empty: {
    marginTop: 8,
    color: '#666',
  },
});
