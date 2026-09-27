import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { CARD_BRANDS, dateToExpiry, maskCardNumber } from '../utils/card';

const DebitCardItem = ({ card, isSelected, onSelect, onEdit }) => {
  const brand = CARD_BRANDS[card.marca] ?? CARD_BRANDS.unknown;

  return (
    <View style={styles.debitCard}>
      <View style={styles.cardHeader}>
        <View style={styles.brand}>
          <FontAwesome name={brand.icon} size={28} color="#3D2A80" />
          <Text variant="labelLarge">{brand.label}</Text>
        </View>
        <Checkbox status={isSelected ? 'checked' : 'unchecked'} onPress={onSelect} />
      </View>
      <Text style={styles.textCardDebit} variant="titleMedium">
        {maskCardNumber(card.last4)}
      </Text>
      <Text variant="bodySmall">Vence {dateToExpiry(card.fecha_expiracion)}</Text>
      <Button mode="contained" style={styles.buttonCardDebit} onPress={onEdit}>
        Editar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  debitCard: {
    marginHorizontal: 21,
    marginVertical: 8,
    padding: 16,
    backgroundColor: '#EADDFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textCardDebit: {
    marginTop: 8,
    fontSize: 16,
  },
  buttonCardDebit: {
    marginTop: 8,
    backgroundColor: '#9C7CFE',
  },
});

export default DebitCardItem;
