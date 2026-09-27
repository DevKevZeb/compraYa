import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { formatCurrency } from '../utils/order';

const STATUS_LABELS = {
  pendiente: { label: 'En camino', color: '#FFE8A3' },
  en_camino: { label: 'En camino', color: '#FFE8A3' },
  entregado: { label: 'Entregado', color: '#C8F2C2' },
  cancelado: { label: 'Cancelado', color: '#FFD0D0' },
};

export const OrderCard = ({ order, onTrack, onConfirm }) => {
  const status = STATUS_LABELS[order.estado] ?? { label: order.estado, color: '#EEE' };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text variant="titleMedium">{order.numero_seguimiento}</Text>
        <Chip compact style={{ backgroundColor: status.color }}>
          {status.label}
        </Chip>
      </View>
      <Text variant="bodySmall">{new Date(order.fecha).toLocaleString()}</Text>
      <Text variant="bodyMedium" style={styles.address}>
        {order.direccion_envio}
      </Text>

      {order.items_orden?.map((item) => (
        <View key={item.item_orden_id} style={styles.itemRow}>
          <Text variant="bodySmall" style={styles.itemName} numberOfLines={1}>
            {item.cantidad} × {item.nombre_producto}
          </Text>
          <Text variant="bodySmall">{formatCurrency(item.subtotal)}</Text>
        </View>
      ))}

      <View style={styles.itemRow}>
        <Text variant="titleSmall">Total</Text>
        <Text variant="titleSmall">{formatCurrency(order.monto_total)}</Text>
      </View>

      {(onTrack || onConfirm) && (
        <View style={styles.actions}>
          {onTrack && (
            <Button compact onPress={() => onTrack(order)}>
              Ver seguimiento
            </Button>
          )}
          {onConfirm && (
            <Button compact mode="contained" buttonColor="#9C7CFE" onPress={() => onConfirm(order)}>
              Confirmar recepción
            </Button>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#EADDFF',
    borderRadius: 15,
    marginTop: 8,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  address: {
    marginVertical: 6,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  itemName: {
    flex: 1,
    marginRight: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 10,
  },
});
