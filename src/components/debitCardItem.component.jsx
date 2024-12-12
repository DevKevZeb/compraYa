import React from 'react'

import { Button, Text, Checkbox } from 'react-native-paper';
import { View, Image, StyleSheet } from 'react-native';
import visa from '../../assets/visa.png';

const DebitCardItem = ({ method, isSelected, onSelect, onEdit }) => {
  return (
    <View style={styles.debitCard}>
      <View style={styles.cardHeader}>
        <Image source={visa} style={styles.cardIcon} />
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={onSelect}
        />
      </View>
      <Text style={styles.textCardDebit} variant="titleMedium">
        {method.tarjetas_pago[0].last3
          ? `**** **** **** ${method.tarjetas_pago[0].last3}`
          : 'Sin detalles'}
      </Text>
      <Button
        mode="contained"
        style={styles.buttonCardDebit}
        onPress={onEdit}
      >
        Editar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  debitCard: {
    marginHorizontal:20,
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
  cardIcon: {
    width: 40,
    height: 24,
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
