import React, { useEffect } from 'react';

import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import visa from '../../../assets/visa.png';
import { Controller, useForm } from 'react-hook-form';
import { useDebitCards } from '../../Stores/global.store';
import { deleteDebitCard, saveDebitCard } from '../../services/api.services';

export const DebitCardComponent = ({ navigation }) => {
  const {
    isEditing,
    cardDetails,
    setEditing,
    setCardDetails,
    refreshDebitCards,
    setLoading,
  } = useDebitCards();

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      cardNumber: '',
      expiryDate: '',
      userName: '',
    },
  });

  useEffect(() => {
    if (isEditing && cardDetails) {
      setValue('cardNumber', cardDetails.last3 || '');
      setValue('expiryDate', cardDetails.fecha_expiracion || '');
      setValue('userName', cardDetails.userName || '');
    }
  }, [isEditing, cardDetails, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await saveDebitCard(data, isEditing, cardDetails);

      if (!result.success) {
        alert('Error: ' + result.error.message);
        return;
      }
      alert(result.message);
      reset();
      refreshDebitCards();
      navigation.goBack();
    } catch (error) {
      alert('Error inesperado. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const result = await deleteDebitCard(cardDetails.metodo_pago_id);

      if (!result.success) {
        alert('Error: ' + result.error.message);
        return;
      }

      alert(result.message);
      refreshDebitCards(); // Refresh store after deleting
      navigation.goBack();
    } catch (error) {
      alert('Error inesperado. Intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <View style={styles.containerVisa}>
          <Image source={visa} />
        </View>

        <Controller
          name="cardNumber"
          control={control}
          rules={{
            required: 'Número de tarjeta es obligatorio',
            pattern: {
              value: /^\d{3}$/, // Validar 3 digitos
              message: 'Debe ingresar un número de tarjeta válido (3 dígitos)',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              label="Número de tarjeta"
              placeholder="Ingrese los últimos 3 dígitos"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              style={styles.numInput}
              error={!!errors.cardNumber}
            />
          )}
        />
        {errors.cardNumber && (
          <Text style={styles.errorText}>{errors.cardNumber.message}</Text>
        )}

        <Controller
          name="expiryDate"
          control={control}
          rules={{
            required: 'Fecha de expiración es obligatoria',
            pattern: {
              value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
              message: 'Formato inválido (MM/YY)',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              label="MM/YY"
              placeholder="MM/YY"
              keyboardType="numeric"
              value={value}
              onChangeText={onChange}
              style={styles.numInput}
              error={!!errors.expiryDate}
            />
          )}
        />
        {errors.expiryDate && (
          <Text style={styles.errorText}>{errors.expiryDate.message}</Text>
        )}

        <Controller
          name="userName"
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              mode="outlined"
              label="Nombre de usuario"
              value={value}
              onChangeText={onChange}
              style={styles.numInput}
            />
          )}
        />

        <View style={styles.containerButtons}>
          <Button
            mode="contained"
            style={styles.saveButton}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          >
            Guardar
          </Button>
          {isEditing && (
            <Button
              mode="contained"
              style={styles.deleteButton}
              onPress={handleDelete}
            >
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
  containerVisa: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  numInput: {
    marginBottom: 15,
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
