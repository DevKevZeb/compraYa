import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { OrderTimeline } from '../../components/OrderTimeline';
import { Price, ProductImage, SectionHeader, StatusChip } from '../../components/ui';
import { getOrder } from '../../services/api';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { CARD_BRANDS } from '../../utils/card';
import { formatCurrency } from '../../utils/order';
import { formatOrderDate, getOrderStatus } from '../../utils/orderStatus';

const paymentLabel = (method) => {
  if (!method) return 'Not available';
  if (method.tipo_metodo === 'qr') return 'QR payment';
  const card = method.tarjetas_pago;
  return card ? `${CARD_BRANDS[card.marca]?.label ?? 'Card'} •••• ${card.last4}` : 'Card';
};

export const OrderDetailScreen = ({ navigation, route }) => {
  const [order, setOrder] = useState(route.params.order);
  const [confirming, setConfirming] = useState(false);
  const updateOrderStatus = useUserStore((state) => state.updateOrderStatus);
  const status = getOrderStatus(order.estado);
  const items = order.items_orden ?? [];

  // Refresh in case the order changed since the list was loaded.
  useEffect(() => {
    let cancelled = false;
    getOrder(order.orden_id).then(({ data }) => {
      if (!cancelled && data) setOrder(data);
    });
    return () => {
      cancelled = true;
    };
  }, [order.orden_id]);

  const confirmDelivery = async () => {
    setConfirming(true);
    const { error } = await updateOrderStatus(order.orden_id, 'entregado');
    setConfirming(false);
    if (error) {
      Toast.show({ type: 'error', text1: 'Could not update the order', text2: error.message });
      return;
    }
    setOrder((current) => ({ ...current, estado: 'entregado' }));
    Toast.show({ type: 'success', text1: 'Enjoy your order!', text2: 'Marked as delivered.' });
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <View style={styles.flex}>
            <Text variant="titleLarge" style={styles.text}>
              {order.numero_seguimiento}
            </Text>
            <Text variant="bodySmall" style={styles.muted}>
              Placed {formatOrderDate(order.fecha)}
            </Text>
          </View>
          <StatusChip label={status.label} tone={status.tone} />
        </View>
        <Divider style={styles.divider} />
        <OrderTimeline order={order} />
        {status.active ? (
          <View style={styles.actions}>
            <Button
              mode="contained"
              icon="map-marker-path"
              onPress={() =>
                navigation.navigate('DeliveryMap', {
                  direccion_envio: order.direccion_envio,
                  order,
                })
              }
              style={styles.action}
            >
              Track delivery
            </Button>
            <Button
              mode="outlined"
              icon="check"
              onPress={confirmDelivery}
              loading={confirming}
              disabled={confirming}
              style={styles.action}
            >
              I received it
            </Button>
          </View>
        ) : null}
      </View>

      <SectionHeader title={`Items (${items.length})`} style={styles.section} />
      <View style={styles.card}>
        {items.map((item, index) => (
          <View key={item.item_orden_id} style={[styles.itemRow, index > 0 && styles.itemDivider]}>
            <ProductImage uri={item.productos?.url_imagen} height={52} style={styles.thumb} />
            <View style={styles.flex}>
              <Text variant="bodyMedium" numberOfLines={2} style={styles.text}>
                {item.nombre_producto}
              </Text>
              <Text variant="bodySmall" style={styles.muted}>
                {item.cantidad} × {formatCurrency(item.precio_unitario)}
              </Text>
            </View>
            <Price value={item.subtotal} variant="titleSmall" />
          </View>
        ))}
      </View>

      <SectionHeader title="Delivery & payment" style={styles.section} />
      <View style={styles.card}>
        <Text variant="labelMedium" style={styles.label}>
          DELIVERY ADDRESS
        </Text>
        <Text variant="bodyMedium" style={styles.text}>
          {order.direccion_envio}
        </Text>
        <Divider style={styles.divider} />
        <Text variant="labelMedium" style={styles.label}>
          PAYMENT
        </Text>
        <Text variant="bodyMedium" style={styles.text}>
          {paymentLabel(order.metodos_pago)}
        </Text>
      </View>

      <SectionHeader title="Summary" style={styles.section} />
      <View style={styles.card}>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium" style={styles.muted}>
            Subtotal
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {formatCurrency(order.monto_total - order.costo_envio)}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyMedium" style={styles.muted}>
            Shipping
          </Text>
          <Text variant="bodyMedium" style={styles.text}>
            {formatCurrency(order.costo_envio)}
          </Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.summaryRow}>
          <Text variant="titleMedium" style={styles.text}>
            Total
          </Text>
          <Text variant="titleLarge" style={styles.text}>
            {formatCurrency(order.monto_total)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  section: {
    marginTop: spacing.xl,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  text: {
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
  label: {
    color: colors.textSubtle,
    letterSpacing: 0.5,
    marginBottom: spacing.xxs,
  },
  divider: {
    marginVertical: spacing.md,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  action: {
    flex: 1,
    borderRadius: radius.pill,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.sm,
  },
  itemDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  thumb: {
    width: 52,
    backgroundColor: colors.background,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.xxs,
  },
});
