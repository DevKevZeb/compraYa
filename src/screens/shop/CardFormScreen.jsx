import FontAwesome from '@expo/vector-icons/FontAwesome';
import React, { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { deleteDebitCard, saveDebitCard } from '../../services/api';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import {
  CARD_BRANDS,
  dateToExpiry,
  detectCardBrand,
  expiryToDate,
  formatCardNumber,
  formatExpiry,
  getLast4,
  isValidCardNumber,
  isValidExpiry,
  maskCardNumber,
} from '../../utils/card';

export const CardFormScreen = ({ navigation }) => {
  const user = useUserStore((state) => state.user);
  const { isEditing, cardDetails, refreshDebitCards, selectedMethod, setSelectedMethod } =
    usePaymentStore();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      holderName: user?.nombre_usuario ?? '',
    },
  });

  useEffect(() => {
    if (isEditing && cardDetails) {
      setValue('expiryDate', dateToExpiry(cardDetails.fecha_expiracion));
    }
  }, [isEditing, cardDetails, setValue]);

  const cardNumber = useWatch({ control, name: 'cardNumber' });
  const brandKey = isEditing ? cardDetails?.marca : detectCardBrand(cardNumber);
  const brand = CARD_BRANDS[brandKey] ?? CARD_BRANDS.unknown;

  const showResult = (result) =>
    Toast.show({
      type: result.success ? 'success' : 'error',
      text1: result.success ? 'Listo' : 'Error',
      text2: result.success ? result.message : result.error.message,
    });

  const onSubmit = async ({ cardNumber, expiryDate }) => {
    const card = { fecha_expiracion: expiryToDate(expiryDate) };
    if (!isEditing) {
      card.last4 = getLast4(cardNumber);
      card.marca = detectCardBrand(cardNumber);
    }

    const result = await saveDebitCard({
      userId: user.userId,
      card,
      metodoPagoId: isEditing ? cardDetails.metodo_pago_id : null,
    });

    showResult(result);
    if (result.success) {
      await refreshDebitCards(user.userId);
      navigation.goBack();
    }
  };

  const handleDelete = async () => {
    const result = await deleteDebitCard(cardDetails.metodo_pago_id);

    showResult(result);
    if (result.success) {
      if (selectedMethod === cardDetails.metodo_pago_id) {
        setSelectedMethod(null);
      }
      await refreshDebitCards(user.userId);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.brand}>
          <FontAwesome name={brand.icon} size={48} color="#3D2A80" />
        </View>

        {isEditing ? (
          <TextInput
            mode="outlined"
            label="Número de tarjeta"
            value={maskCardNumber(cardDetails?.last4)}
            disabled
            style={styles.numInput}
          />
        ) : (
          <>
            <Controller
              name="cardNumber"
              control={control}
              rules={{
                required: 'El número de tarjeta es obligatorio',
                validate: (value) => isValidCardNumber(value) || 'Número de tarjeta inválido',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  mode="outlined"
                  label="Número de tarjeta"
                  placeholder="4242 4242 4242 4242"
                  keyboardType="number-pad"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatCardNumber(text))}
                  style={styles.numInput}
                  error={!!errors.cardNumber}
                />
              )}
            />
            {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber.message}</Text>}
          </>
        )}

        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: 'La fecha de expiración es obligatoria',
            validate: (value) => isValidExpiry(value) || 'Fecha inválida o vencida (MM/YY)',
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Vencimiento"
              placeholder="MM/YY"
              keyboardType="number-pad"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => onChange(formatExpiry(text))}
              style={styles.numInput}
              error={!!errors.expiryDate}
            />
          )}
        />
        {errors.expiryDate && <Text style={styles.errorText}>{errors.expiryDate.message}</Text>}

        <Controller
          name="holderName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              label="Titular"
              value={value}
              onChangeText={onChange}
              style={styles.numInput}
            />
          )}
        />

        <Text style={styles.notice}>
          Solo guardamos la marca y los últimos 4 dígitos de tu tarjeta.
        </Text>

        <View style={styles.containerButtons}>
          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            Guardar
          </Button>
          {isEditing && (
            <Button mode="contained" style={styles.deleteButton} onPress={handleDelete}>
              Eliminar
            </Button>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    marginTop: 40,
    width: 346,
    padding: 20,
    backgroundColor: '#EADDFF',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  brand: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  numInput: {
    marginBottom: 15,
  },
  notice: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  saveButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: '#9C7CFE',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#FF5252',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 20,
    marginBottom: 10,
  },
});
