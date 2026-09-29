import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { CardPreview } from '../../components/CardPreview';
import { EmptyState, SectionHeader, Skeleton } from '../../components/ui';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, spacing } from '../../theme';
import { dateToExpiry } from '../../utils/card';

// Saved cards: tap a card to edit its expiry date or remove it.
export const PaymentMethodsScreen = ({ navigation }) => {
  const { debitCards, loading, refreshDebitCards, setEditing, setCardDetails } = usePaymentStore();
  const userId = useUserStore((state) => state.user?.userId);
  const holderName = useUserStore((state) => state.user?.nombre_usuario);

  useFocusEffect(
    useCallback(() => {
      if (userId) {
        refreshDebitCards(userId);
      }
    }, [userId, refreshDebitCards])
  );

  const openCardForm = (card) => {
    setEditing(Boolean(card));
    setCardDetails(card);
    navigation.navigate('CardForm');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <SectionHeader title="Saved cards" />

      {loading && debitCards.length === 0 ? (
        <Skeleton height={190} radius={radius.lg} />
      ) : debitCards.length === 0 ? (
        <EmptyState
          icon="credit-card-plus-outline"
          title="No cards yet"
          description="Save a card to check out faster."
        />
      ) : (
        <View style={styles.cards}>
          {debitCards.map((card) => (
            <Pressable
              key={card.metodo_pago_id}
              onPress={() => openCardForm(card)}
              accessibilityRole="button"
              accessibilityLabel={`Edit card ending in ${card.last4}`}
            >
              <CardPreview
                compact
                brand={card.marca}
                last4={card.last4}
                holder={holderName}
                expiry={dateToExpiry(card.fecha_expiracion)}
              />
            </Pressable>
          ))}
        </View>
      )}

      <Button
        mode="contained"
        icon="plus"
        onPress={() => openCardForm(null)}
        style={styles.button}
        contentStyle={styles.buttonContent}
      >
        Add a new card
      </Button>
      <Text variant="bodySmall" style={styles.hint}>
        QR payments are available at checkout and need no setup.
      </Text>
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
  cards: {
    gap: spacing.lg,
  },
  button: {
    marginTop: spacing.xxl,
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
  hint: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
