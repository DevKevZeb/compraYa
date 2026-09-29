import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { CheckoutSteps } from '../../components/CheckoutSteps';
import { OrderSummary } from '../../components/OrderSummary';
import { PaymentOption } from '../../components/PaymentOption';
import { Price, ProductImage, SectionHeader } from '../../components/ui';
import { useCartStore } from '../../stores/cart.store';
import { useCheckoutStore } from '../../stores/checkout.store';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { CARD_BRANDS, dateToExpiry } from '../../utils/card';
import { calculateOrderTotals, formatCurrency } from '../../utils/order';

const STEPS = ['Address', 'Payment', 'Review'];
const MIN_ADDRESS_LENGTH = 5;

export const CheckoutScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const cartItems = useCartStore((state) => state.cartItems);
  const saveOrder = useCartStore((state) => state.saveOrder);
  const lastAddress = useCheckoutStore((state) => state.lastAddress);
  const setLastAddress = useCheckoutStore((state) => state.setLastAddress);
  const userId = useUserStore((state) => state.user?.userId);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const {
    debitCards,
    refreshDebitCards,
    selectedMethod,
    setSelectedMethod,
    setEditing,
    setCardDetails,
  } = usePaymentStore();

  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(lastAddress);
  const [placing, setPlacing] = useState(false);

  const { total } = calculateOrderTotals(cartItems);
  const selectedCard = debitCards.find((card) => card.metodo_pago_id === selectedMethod);
  // Any selected method that is not a saved card is the QR payment method.
  const payingByQr = Boolean(selectedMethod) && !selectedCard;
  const addressValid = address.trim().length >= MIN_ADDRESS_LENGTH;

  // Cards may be added from the card form, so refresh whenever checkout regains focus.
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        refreshDebitCards(userId);
      }
    }, [userId, refreshDebitCards])
  );

  const addCard = () => {
    setEditing(false);
    setCardDetails(null);
    navigation.navigate('CardForm');
  };

  const placeOrder = async () => {
    setPlacing(true);
    const { order, error } = await saveOrder(address.trim(), selectedMethod);
    setPlacing(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'We could not place your order', text2: error.message });
      return;
    }

    setLastAddress(address.trim());
    fetchUserOrders();
    // Replace checkout with the confirmation so going back returns to the cart.
    navigation.reset({
      index: 1,
      routes: [{ name: 'Cart' }, { name: 'OrderSuccess', params: { order } }],
    });
  };

  const paymentLabel = selectedCard
    ? `${CARD_BRANDS[selectedCard.marca]?.label ?? 'Card'} •••• ${selectedCard.last4}`
    : payingByQr
      ? 'QR payment'
      : 'Not selected';

  const renderAddress = () => (
    <View>
      <SectionHeader title="Where should we deliver?" />
      <TextInput
        mode="outlined"
        label="Delivery address"
        placeholder="Street, number and area"
        value={address}
        onChangeText={setAddress}
        multiline
        left={<TextInput.Icon icon="map-marker-outline" />}
        outlineStyle={styles.inputOutline}
        style={styles.input}
      />
      <Text variant="bodySmall" style={styles.hint}>
        We deliver across Cochabamba. You can follow the courier on the map after paying.
      </Text>
    </View>
  );

  const renderPayment = () => (
    <View style={styles.gap}>
      <SectionHeader title="How would you like to pay?" />
      {debitCards.map((card) => (
        <PaymentOption
          key={card.metodo_pago_id}
          iconSet="fontawesome"
          icon={CARD_BRANDS[card.marca]?.icon ?? 'credit-card'}
          title={`${CARD_BRANDS[card.marca]?.label ?? 'Card'} •••• ${card.last4}`}
          subtitle={`Expires ${dateToExpiry(card.fecha_expiracion)}`}
          selected={selectedMethod === card.metodo_pago_id}
          onPress={() => setSelectedMethod(card.metodo_pago_id)}
        />
      ))}
      <PaymentOption
        icon="qrcode-scan"
        title="Pay with QR"
        subtitle="Scan a code from your banking app"
        selected={payingByQr}
        onPress={() => navigation.navigate('QrPayment')}
      />
      <Button icon="plus" mode="outlined" onPress={addCard} style={styles.addCard}>
        Add a new card
      </Button>
    </View>
  );

  const renderReview = () => (
    <View>
      <SectionHeader title={`Items (${cartItems.length})`} />
      <View style={styles.card}>
        {cartItems.map((item, index) => (
          <View key={item.producto_id} style={[styles.itemRow, index > 0 && styles.itemDivider]}>
            <ProductImage uri={item.url_imagen} height={48} style={styles.thumb} />
            <Text variant="bodyMedium" numberOfLines={1} style={styles.itemName}>
              {item.cantidad} × {item.nombre_producto}
            </Text>
            <Price value={item.precio * item.cantidad} variant="bodyMedium" />
          </View>
        ))}
      </View>

      <View style={[styles.card, styles.gapTop]}>
        <View style={styles.detailRow}>
          <View style={styles.detailText}>
            <Text variant="labelMedium" style={styles.muted}>
              DELIVERY ADDRESS
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {address.trim()}
            </Text>
          </View>
          <Button compact onPress={() => setStep(0)}>
            Edit
          </Button>
        </View>
        <View style={[styles.detailRow, styles.itemDivider]}>
          <View style={styles.detailText}>
            <Text variant="labelMedium" style={styles.muted}>
              PAYMENT
            </Text>
            <Text variant="bodyMedium" style={styles.value}>
              {paymentLabel}
            </Text>
          </View>
          <Button compact onPress={() => setStep(1)}>
            Edit
          </Button>
        </View>
      </View>

      <OrderSummary items={cartItems} style={[styles.card, styles.gapTop]} />
    </View>
  );

  const canContinue = step === 0 ? addressValid : step === 1 ? Boolean(selectedMethod) : true;

  return (
    <View style={styles.screen}>
      <CheckoutSteps steps={STEPS} current={step} />
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {step === 0 ? renderAddress() : step === 1 ? renderPayment() : renderReview()}
      </ScrollView>

      <View style={[styles.bar, { paddingBottom: insets.bottom + spacing.md }]}>
        {step > 0 ? (
          <Button
            mode="outlined"
            onPress={() => setStep(step - 1)}
            style={styles.back}
            contentStyle={styles.buttonContent}
          >
            Back
          </Button>
        ) : null}
        <Button
          mode="contained"
          onPress={step < STEPS.length - 1 ? () => setStep(step + 1) : placeOrder}
          disabled={!canContinue || placing || cartItems.length === 0}
          loading={placing}
          style={styles.next}
          contentStyle={styles.buttonContent}
        >
          {step < STEPS.length - 1 ? 'Continue' : `Place order · ${formatCurrency(total)}`}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  gap: {
    gap: spacing.md,
  },
  gapTop: {
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.surface,
    minHeight: 90,
  },
  inputOutline: {
    borderRadius: radius.md,
  },
  hint: {
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  addCard: {
    borderRadius: radius.pill,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    ...shadows.card,
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
    width: 48,
    backgroundColor: colors.background,
  },
  itemName: {
    flex: 1,
    color: colors.text,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  detailText: {
    flex: 1,
    gap: spacing.xxs,
  },
  muted: {
    color: colors.textSubtle,
    letterSpacing: 0.5,
  },
  value: {
    color: colors.text,
  },
  bar: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: colors.surface,
    ...shadows.bar,
  },
  back: {
    borderRadius: radius.pill,
  },
  next: {
    flex: 1,
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
});
