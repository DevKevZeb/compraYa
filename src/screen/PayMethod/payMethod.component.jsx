import React, { useEffect, useState } from 'react';

import { Button, Text, List, Checkbox, ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import qrImage from '../../../assets/qrImage.png';
import { useDebitCards } from '../../Stores/global.store';
import DebitCardItem from '../../components/debitCardItem.component';

export const PayMethodComponent = ({ navigation }) => {
  const {
    debitCards,
    loading,
    setLoading,
    refreshDebitCards,
    setEditing,
    setCardDetails,
  } = useDebitCards();
  const [selectedMethod, setSelectedMethod] = useState(null);

  useEffect(() => {
    setLoading(true);
    refreshDebitCards();
  }, [setLoading, refreshDebitCards]);

  const handleSelectMethod = (methodId) => setSelectedMethod(methodId);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size='large' color='#9C7CFE' />
        <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.containerText} variant='titleMedium'>
        Tarjetas de credito y debito
      </Text>

      <List.Item
        title='Nueva Tarjeta'
        style={styles.listItem}
        right={() => (
          <Button
            mode='contained'
            style={styles.buttonItem}
            onPress={() => {
              setEditing(false);
              setCardDetails(null);
              navigation.navigate('DebitCard');
            }}
          >
            Agregar
          </Button>
        )}
      />

      {debitCards.length > 0 ? (
        debitCards.map((method, index) => (
          <DebitCardItem
            key={`debit-card-${index}`}
            method={method}
            isSelected={selectedMethod === method.metodo_pago_id}
            onSelect={() => handleSelectMethod(method.metodo_pago_id)}
            onEdit={() => {
              setEditing(true);
              setCardDetails({
                metodo_pago_id: method.metodo_pago_id,
                last3: method.tarjetas_pago[0]?.last3 || '',
                marca: method.tarjetas_pago[0]?.marca || '',
                fecha_expiracion: method.tarjetas_pago[0]?.fecha_expiracion || '',
              });
              navigation.navigate('DebitCard');
            }}
          />
        ))
      ) : (
        <Text style={styles.noMethodsText}>
          No hay métodos de pago guardados.
        </Text>
      )}

      <Text variant='titleMedium' style={styles.containerText}>
        Otros metodos de pago
      </Text>
      <List.Item
        title='Pago por Qr'
        style={styles.listItem}
        right={(props) => <Image source={qrImage} />}
        onPress={() => navigation.navigate('QrMethod')}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerText: {
    marginLeft: 30,
    marginTop: 20,
  },
  listItem: {
    backgroundColor: '#EADDFF',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonItem: {
    backgroundColor: '#9C7CFE',
  },
  noMethodsText: {
    textAlign: 'center',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
