import React, { useEffect, useState } from 'react';

import { Button, Text, List, Checkbox } from 'react-native-paper';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import qrImage from '../../../assets/qrImage.png';
import visa from '../../../assets/visa.png';
import { useDebitCards } from '../../Stores/global.store';

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
    const fetchDebitCards = async () => {
      setLoading(true);
      await refreshDebitCards();
    };

    fetchDebitCards();
  }, [setLoading, refreshDebitCards]);

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
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
        right={(props) => (
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
          <View key={`debit-card-${index}`} style={styles.debitCard}>
            <View style={styles.cardHeader}>
              <Image source={visa} style={styles.cardIcon} />
              <Checkbox
                status={
                  selectedMethod === method.metodo_pago_id
                    ? 'checked'
                    : 'unchecked'
                }
                onPress={() => handleSelectMethod(method.metodo_pago_id)}
              />
            </View>
            <Text style={styles.textCardDebit} variant='titleMedium'>
              {method.tarjetas_pago.last3
                ? `**** **** **** ${method.tarjetas_pago.last3}`
                : 'Sin detalles'}
            </Text>
            <Button
              mode='contained'
              style={styles.buttonCardDebit}
              onPress={() => {
                setEditing(true);
                setCardDetails({
                  metodo_pago_id: method.metodo_pago_id,
                  last3: method.tarjetas_pago?.last3 || '',
                  marca: method.tarjetas_pago?.marca || '',
                  fecha_expiracion: method.tarjetas_pago?.fecha_expiracion || '',
                });
                navigation.navigate('DebitCard');
              }}
            >
              Editar
            </Button>
          </View>
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
  debitCard: {
    width: 353,
    height: 185,
    backgroundColor: '#EADDFF',
    marginTop: 13,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    padding: 10,
  },
  cardHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardIcon: {
    marginLeft: 20,
  },
  textCardDebit: {
    marginLeft: 20,
    marginTop: 15,
  },
  buttonCardDebit: {
    width: '40%',
    backgroundColor: '#9C7CFE',
    marginLeft: 20,
    marginTop: 6,
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
