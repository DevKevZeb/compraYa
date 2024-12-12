import * as React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { Button, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../Stores/card.store';

export const ShoppingScreen = ({ navigation }) => {
  const prouductSelected = useCartStore((state) => state.cartItems);
  /**To do: Arreglar el costo de envio de acuerdo a la direccion de envio.*/
  // const shippingCost = 100; //
  const subTotal = prouductSelected.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0,
  );
  // const total = subTotal + shippingCost;
  const total = subTotal;

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <SafeAreaView
          style={styles.safeContainer}
          edges={['left', 'right', 'bottom']}
        >
          <ScrollView>
            <ListCardComponent />
          </ScrollView>
        </SafeAreaView>
      </View>

      <View style={styles.costContainer}>
        {/* <View style={styles.row}>
          <Text variant='bodyMedium'>Costo Envio:</Text>
          <Text variant='bodyMedium'>{shippingCost} Bs</Text>
        </View> */}
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text variant='bodyMedium'>Subtotal:</Text>
          <Text variant='bodyMedium'>{subTotal.toFixed(2)} Bs</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>
            Total:
          </Text>
          <Text variant='bodyMedium' style={{ fontWeight: 'bold' }}>
            {total.toFixed(2)} Bs
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode='contained'
          onPress={() => navigation.navigate('PayMethod')}
          style={{ backgroundColor: '#9C7CFE' }}
        >
          Continuar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 15,
  },
  scrollContainer: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
    borderColor: 'gray',
    padding: 6,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  costContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  divider: {
    marginVertical: 5,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '80%',
  },
});
