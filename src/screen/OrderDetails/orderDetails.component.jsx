import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Button, List, Text, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useCartStore } from "../../Stores/card.store";
import { useDebitCards } from "../../Stores/global.store";

export const OrderDetailsComponent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      address: "",
    },
  });

  const cartItems = useCartStore((state) => state.cartItems);
  const saveOrder = useCartStore((state) => state.saveOrder);
  const selectedPaymentMethod = useDebitCards((state) => state.selectedMethod);
  const shippingCost = 20;
  const subTotal = cartItems.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );
  const total = subTotal + shippingCost;
  const currentDate = new Date().toLocaleDateString();

  const handlePayment = async (data) => {
    if (!selectedPaymentMethod) {
      alert("Por favor seleccione un método de pago.");
      return;
    }

    await saveOrder(data.address, selectedPaymentMethod, total);
    Toast.show({
      type: "success",
      text1: "Pago realizado exitosamente",
      text2: "Tu pedido ha sido procesado.",
    });
    navigation.navigate("listProducto");
  };

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <Text variant="titleMedium" style={styles.text}>
          Productos en pedido
        </Text>
        <SafeAreaView
          style={styles.safeContainer}
          edges={["left", "right", "bottom"]}
        >
          <ScrollView>
            {cartItems.map((item) => (
              <View key={item.producto_id} style={styles.productItem}>
                <Text>{item.nombre_producto}</Text>
                <Text>Cantidad: {item.cantidad}</Text>
                <Text>Precio: {item.precio} Bs</Text>
                <Text>
                  Subtotal: {(item.precio * item.cantidad).toFixed(2)} Bs
                </Text>
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
          required: "Necesita ingresar una dirección",
          pattern: {
            value: /^[a-zA-Z0-9\s,.'-]{3,100}$/, //permite comas, guiones, apóstrofes y puntos
            message: "Debe ingresar una dirección válida",
          },
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
      {errors.address && (
        <Text style={styles.errorText}>{errors.address.message}</Text>
      )}
      <List.Item
        title="Método de pago"
        style={styles.listItem}
        right={() => (
          <Button
            mode="contained"
            style={styles.buttonItem}
            onPress={() => {
              navigation.navigate("PayMethod");
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
          Costo Envío: {shippingCost} Bs
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Fecha: {currentDate}
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Subtotal: {subTotal.toFixed(2)} Bs
        </Text>
        <Text variant="titleSmall" style={styles.textDetail}>
          Total: {total.toFixed(2)} Bs
        </Text>
      </View>
      <View style={styles.contendButton}>
        <Button
          mode="contained"
          style={styles.payButton}
          onPress={handleSubmit(handlePayment)}
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
    borderColor: "gray",
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
    color: "red",
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
  listItem: {
    width: "100%",
    backgroundColor: "#EADDFF",
    borderRadius: 15,
    marginTop: 8,
  },
  buttonItem: {
    backgroundColor: "#9C7CFE",
  },
  containerDetails: {
    padding: 10,
  },
  textDetail: {
    paddingBottom: 5,
  },
  contendButton: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  payButton: {
    width: "50%",
    backgroundColor: "#9C7CFE",
  },
  productItem: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor:'#EADDFF'
  },
});
