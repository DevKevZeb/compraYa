import React, { useEffect, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, List, Text } from "react-native-paper";
import qrImage from "../../../assets/qrImage.png";
import DebitCardItem from "../../components/debitCardItem.component";
import { getDebitCardsByUser } from "../../services/api.services";
import { useDebitCards } from "../../Stores/global.store";
import { useUserStore } from "../../Stores/user.store";

export const PayMethodComponent = ({ navigation }) => {
  const {
    debitCards,
    loading,
    setLoading,
    refreshDebitCards,
    setEditing,
    setCardDetails,
    setSelectedMethod,
    selectedMethod,
  } = useDebitCards();
  const user = useUserStore((state) => state.user);
  const { userId } = user;
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    setLoading(true);
    refreshDebitCards(userId);
  }, [setLoading, refreshDebitCards]);

  useEffect(() => {
    getDebitCardsByUser(userId);
  }, [setLoading]);

  const handleSelectMethod = (methodId) => {
    if (selectedMethod === methodId) {
      setSelectedMethod(null);
    } else {
      setSelectedMethod(methodId);
    }
  };

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert(
        "Selecciona un método de pago",
        "Por favor selecciona un método de pago antes de continuar."
      );
      return;
    }
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      Alert.alert("Pago exitoso", "El pago se procesó correctamente.", [
        {
          text: "Continuar",
          onPress: () => navigation.navigate("DeliveryMap"),
        },
      ]);
    }, 2000);
  };

  const handleSaveCard = async (cardDetails) => {
    const { last3, marca, fecha_expiracion } = cardDetails;
    const { data, error } = await supabase.from("metodos_pago").insert([
      {
        usuario_id: userId,
        tipo_metodo: "card",
        activo: true,
        detalles: last3,
        tarjetas_pago: {
          last3,
          marca,
          fecha_expiracion,
        },
      },
    ]);

    if (error) {
      console.error("Error saving card:", error.message || error);
    } else {
      console.log("Card saved:", data);
      refreshDebitCards(userId);
    }
  };

  if (loading) {
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
          <Button
            mode="contained"
            style={styles.buttonItem}
            onPress={() => {
              setEditing(false);
              setCardDetails(null);
              navigation.navigate("DebitCard");
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
                last3: method.tarjetas_pago[0]?.last3 || "",
                marca: method.tarjetas_pago[0]?.marca || "",
                fecha_expiracion:
                  method.tarjetas_pago[0]?.fecha_expiracion || "",
              });
              navigation.navigate("DebitCard");
            }}
          />
        ))
      ) : (
        <Text style={styles.noMethodsText}>
          No hay métodos de pago guardados.
        </Text>
      )}

      <Text variant="titleMedium" style={styles.containerText}>
        Otros métodos de pago
      </Text>
      <List.Item
        title="Pago por Qr"
        style={styles.listItem}
        right={(props) => <Image source={qrImage} />}
        onPress={() => navigation.navigate("QrMethod")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: "100%",
    marginBottom: 10,
  },
  containerText: {
    marginLeft: 30,
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#EADDFF",
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 15,
    marginTop: 15,
  },
  buttonItem: {
    backgroundColor: "#9C7CFE",
  },
  noMethodsText: {
    textAlign: "center",
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
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
});
