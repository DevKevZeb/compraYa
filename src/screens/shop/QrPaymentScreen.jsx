import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import { getOrCreateQrPaymentMethod } from '../../services/api';
import { useCartStore } from '../../stores/cart.store';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import { calculateOrderTotals, formatCurrency } from '../../utils/order';

// Simulated QR payment: the code carries the amount and a payment reference,
// as a bank transfer QR would. Confirming selects QR as the order's payment method.
export const QrPaymentScreen = ({ navigation }) => {
  const userId = useUserStore((state) => state.user?.userId);
  const cartItems = useCartStore((state) => state.cartItems);
  const setSelectedMethod = usePaymentStore((state) => state.setSelectedMethod);
  const { total } = calculateOrderTotals(cartItems);
  const [reference] = useState(() => `CY-QR-${Date.now().toString(36).toUpperCase()}`);
  const [loading, setLoading] = useState(false);

  const payload = JSON.stringify({
    merchant: 'CompraYa',
    reference,
    amount: total,
    currency: 'BOB',
  });

  const handleConfirm = async () => {
    setLoading(true);
    const { metodoPagoId, error } = await getOrCreateQrPaymentMethod(userId);
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      return;
    }

    setSelectedMethod(metodoPagoId);
    Toast.show({
      type: 'success',
      text1: 'Pago por QR registrado',
      text2: 'Confirma tu pedido para finalizar la compra.',
    });
    navigation.navigate('Checkout');
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <Text variant="titleMedium">Agrega productos al carrito para generar el QR.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Escanea el código desde tu app bancaria</Text>
      <View style={styles.qr}>
        <QRCode value={payload} size={220} />
      </View>
      <Text variant="headlineSmall">{formatCurrency(total)}</Text>
      <Text variant="bodySmall" style={styles.reference}>
        Referencia: {reference}
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleConfirm}
        loading={loading}
        disabled={loading}
      >
        Ya realicé el pago
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
  },
  qr: {
    marginVertical: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
  },
  reference: {
    marginTop: 4,
    color: '#666',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#9C7CFE',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});
