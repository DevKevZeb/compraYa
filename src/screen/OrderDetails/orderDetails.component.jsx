import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, List, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useCartStore } from '../../Stores/card.store';
import { useDebitCards } from '../../Stores/global.store';
import { useUserStore } from '../../Stores/user.store';
import { maskCardNumber } from '../../utils/card';
import { calculateOrderTotals, formatCurrency } from '../../utils/order';

export const OrderDetailsComponent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address: '',
    },
  });

  const cartItems = useCartStore((state) => state.cartItems);
  const saveOrder = useCartStore((state) => state.saveOrder);
  const debitCards = useDebitCards((state) => state.debitCards);
  const selectedPaymentMethod = useDebitCards((state) => state.selectedMethod);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const { subtotal, shipping, total } = calculateOrderTotals(cartItems);
  const selectedCard = debitCards.find((card) => card.metodo_pago_id === selectedPaymentMethod);
  const currentDate = new Date().toLocaleDateString();

  const handlePayment = async ({ address }) => {
    if (!selectedPaymentMethod) {
      Toast.show({
        type: 'info',
        text1: 'Falta el método de pago',
        text2: 'Por favor seleccione un método de pago.',
      });
      return;
    }

    const { order, error } = await saveOrder(address, selectedPaymentMethod);

    if (error) {
      Toast.show({ type: 'error', text1: 'No se pudo crear el pedido', text2: error.message });
      return;
    }

    await fetchUserOrders();
    Toast.show({
      type: 'success',
      text1: 'Pago realizado exitosamente',
      text2: `Pedido ${order.numero_seguimiento} en camino.`,
    });
    navigation.navigate('listProducto', { direccion_envio: address });
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <Text variant="titleMedium" style={styles.text}>
          Productos en pedido
        </Text>
        <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
          <ScrollView>
            {cartItems.map((item) => (
              <View key={item.producto_id} style={styles.productItem}>
                <Text>{item.nombre_producto}</Text>
                <Text>Cantidad: {item.cantidad}</Text>
                <Text>Precio: {formatCurrency(item.precio)}</Text>
                <Text>Subtotal: {formatCurrency(item.precio * item.cantidad)}</Text>
              </View>
            ))}
          </ScrollView>
        </SafeAreaView>
      </View>
      <Text variant="titleMedium" style={styles.text}>
        Dirección de envío
      </Text>
      <Controller
        name="address"
        control={control}
        rules={{
          required: 'Necesita ingresar una dirección',
          validate: (value) =>
            (value.trim().length >= 5 && value.trim().length <= 150) ||
            'Debe ingresar una dirección válida',
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            mode="outlined"
            label="Dirección de envío"
            placeholder="Ingrese una dirección"
            keyboardType="default"
            value={value}
            onChangeText={onChange}
            style={styles.textInput}
            error={!!errors.address}
          />
        )}
      />
      {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}
      <List.Item
        title="Método de pago"
        description={selectedCard ? maskCardNumber(selectedCard.last4) : 'Sin seleccionar'}
        style={styles.listItem}
        right={() => (
          <Button
            mode="contained"
            style={styles.buttonItem}
            onPress={() => {
              navigation.navigate('PayMethod');
            }}
          >
            Seleccionar
          </Button>
        )}
      />
      <View style={styles.containerDetails}>
        <Text variant="titleMedium" style={styles.text}>
          Monto total
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Costo Envío: {formatCurrency(shipping)}
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Fecha: {currentDate}
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Subtotal: {formatCurrency(subtotal)}
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Total: {formatCurrency(total)}
        </Text>
      </View>
      <View style={styles.contendButton}>
        <Button
          mode="contained"
          style={styles.payButton}
          onPress={handleSubmit(handlePayment)}
          loading={isSubmitting}
          disabled={isSubmitting || cartItems.length === 0}
        >
          Pagar
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
    marginBottom: 10,
  },
  safeContainer: {
    flex: 1,
    borderColor: 'gray',
    padding: 6,
    borderWidth: 0.2,
    borderRadius: 5,
  },
  text: {
    paddingBottom: 10,
  },
  textInput: {
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    width: '100%',
    backgroundColor: '#EADDFF',
    borderRadius: 15,
    marginTop: 8,
  },
  buttonItem: {
    backgroundColor: '#9C7CFE',
  },
  containerDetails: {
    padding: 10,
  },
  textDetail: {
    paddingBottom: 5,
  },
  contendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  payButton: {
    width: '50%',
    backgroundColor: '#9C7CFE',
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#EADDFF',
  },
});
