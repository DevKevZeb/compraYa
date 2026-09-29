import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import { EmptyState } from '../../components/ui';
import { getOrCreateQrPaymentMethod } from '../../services/api';
import { useCartStore } from '../../stores/cart.store';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { calculateOrderTotals, formatCurrency } from '../../utils/order';

const STEPS = [
  'Open your banking app and choose "Pay with QR".',
  'Scan the code and check the amount.',
  'Confirm the transfer, then tap "I have paid".',
];

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
      Toast.show({ type: 'error', text1: 'Something went wrong', text2: error.message });
      return;
    }

    setSelectedMethod(metodoPagoId);
    Toast.show({
      type: 'success',
      text1: 'QR payment registered',
      text2: 'Review and place your order to finish.',
    });
    navigation.navigate('Checkout');
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.empty}>
        <EmptyState
          icon="qrcode-remove"
          title="Nothing to pay yet"
          description="Add products to your cart to generate a QR code."
        />
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.card}>
        <Text variant="labelLarge" style={styles.muted}>
          AMOUNT TO PAY
        </Text>
        <Text variant="displaySmall" style={styles.amount}>
          {formatCurrency(total)}
        </Text>
        <View style={styles.qr}>
          <QRCode value={payload} size={200} color={colors.text} />
        </View>
        <Text variant="bodySmall" style={styles.muted}>
          Reference {reference}
        </Text>
      </View>

      <View style={styles.steps}>
        {STEPS.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={styles.stepNumber}>
              <Text variant="labelMedium" style={styles.stepNumberText}>
                {index + 1}
              </Text>
            </View>
            <Text variant="bodyMedium" style={styles.stepText}>
              {step}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.notice}>
        <MaterialCommunityIcons name="information-outline" size={18} color={colors.primary} />
        <Text variant="bodySmall" style={styles.noticeText}>
          Demo payment: no money is transferred.
        </Text>
      </View>

      <Button
        mode="contained"
        icon="check"
        onPress={handleConfirm}
        loading={loading}
        disabled={loading}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        I have paid
      </Button>
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
  empty: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    ...shadows.card,
  },
  muted: {
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  amount: {
    color: colors.text,
    marginTop: spacing.xs,
  },
  qr: {
    marginVertical: spacing.xl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  steps: {
    marginTop: spacing.xl,
    gap: spacing.md,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: colors.primary,
  },
  stepText: {
    flex: 1,
    color: colors.text,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  noticeText: {
    color: colors.textMuted,
  },
  button: {
    marginTop: spacing.xl,
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
});
