import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Button, List, Text } from 'react-native-paper';
import qrImage from '../../../assets/qrImage.png';
import DebitCardItem from '../../components/debitCardItem.component';
import { useDebitCards } from '../../Stores/global.store';
import { useUserStore } from '../../Stores/user.store';

// Lets the user pick the payment method used by the order being placed.
export const PayMethodComponent = ({ navigation }) => {
  const {
    debitCards,
    loading,
    refreshDebitCards,
    setEditing,
    setCardDetails,
    setSelectedMethod,
    selectedMethod,
  } = useDebitCards();
  const userId = useUserStore((state) => state.user?.userId);

  useEffect(() => {
    if (userId) {
      refreshDebitCards(userId);
    }
  }, [userId, refreshDebitCards]);

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(selectedMethod === methodId ? null : methodId);
  };

  const openCardForm = (card) => {
    setEditing(Boolean(card));
    setCardDetails(card);
    navigation.navigate('DebitCard');
  };

  if (loading && debitCards.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#9C7CFE" />
        <Text style={styles.loadingText}>Cargando métodos de pago...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <Text style={styles.containerText} variant="titleMedium">
        Tarjetas de crédito y débito
      </Text>

      <List.Item
        title="Nueva Tarjeta"
        style={styles.listItem}
        right={() => (
          <Button mode="contained" style={styles.buttonItem} onPress={() => openCardForm(null)}>
            Agregar
          </Button>
        )}
      />

      {debitCards.length > 0 ? (
        debitCards.map((card) => (
          <DebitCardItem
            key={card.metodo_pago_id}
            card={card}
            isSelected={selectedMethod === card.metodo_pago_id}
            onSelect={() => handleSelectMethod(card.metodo_pago_id)}
            onEdit={() => openCardForm(card)}
          />
        ))
      ) : (
        <Text style={styles.noMethodsText}>No hay métodos de pago guardados.</Text>
      )}

      <Text variant="titleMedium" style={styles.containerText}>
        Otros métodos de pago
      </Text>
      <List.Item
        title="Pago por Qr"
        style={styles.listItem}
        right={() => <Image source={qrImage} />}
        onPress={() => navigation.navigate('QrMethod')}
      />

      <View style={styles.contendButton}>
        <Button
          mode="contained"
          style={styles.payButton}
          disabled={!selectedMethod}
          onPress={() => navigation.goBack()}
        >
          Usar tarjeta seleccionada
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
    marginBottom: 10,
  },
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
  contendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  payButton: {
    width: '70%',
    backgroundColor: '#9C7CFE',
  },
});
