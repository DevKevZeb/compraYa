import * as React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartItemList } from '../../components/CartItemList';
import { useCartStore } from '../../stores/cart.store';
import { calculateSubtotal } from '../../utils/order';

export const CartScreen = ({ navigation }) => {
  const prouductSelected = useCartStore((state) => state.cartItems);
  const subTotal = calculateSubtotal(prouductSelected);
  const total = subTotal;

  const handleContinue = () => {
    navigation.navigate('Checkout');
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
          <ScrollView>
            <CartItemList />
          </ScrollView>
        </SafeAreaView>
      </View>

      <View style={styles.costContainer}>
        <View style={styles.row}>
          <Text variant="bodyMedium">Subtotal:</Text>
          <Text variant="bodyMedium">{subTotal.toFixed(2)} Bs</Text>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.row}>
          <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            Total:
          </Text>
          <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>
            {total.toFixed(2)} Bs
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleContinue} style={{ backgroundColor: '#9C7CFE' }}>
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
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
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
