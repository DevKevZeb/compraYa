import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { CardPreview } from '../../components/CardPreview';
import { deleteDebitCard, saveDebitCard } from '../../services/api';
import { usePaymentStore } from '../../stores/payment.store';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, spacing } from '../../theme';
import {
  dateToExpiry,
  detectCardBrand,
  expiryToDate,
  formatCardNumber,
  formatExpiry,
  getLast4,
  isValidCardNumber,
  isValidExpiry,
  maskCardNumber,
  onlyDigits,
} from '../../utils/card';

const FieldError = ({ error }) =>
  error ? (
    <Text variant="bodySmall" style={styles.error}>
      {error.message}
    </Text>
  ) : null;

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
      cvc: '',
      holderName: user?.nombre_usuario ?? '',
    },
  });

  useEffect(() => {
    if (isEditing && cardDetails) {
      setValue('expiryDate', dateToExpiry(cardDetails.fecha_expiracion));
    }
  }, [isEditing, cardDetails, setValue]);

  const [cardNumber, expiryDate, holderName] = useWatch({
    control,
    name: ['cardNumber', 'expiryDate', 'holderName'],
  });
  const brand = isEditing ? cardDetails?.marca : detectCardBrand(cardNumber);

  const showResult = (result) =>
    Toast.show({
      type: result.success ? 'success' : 'error',
      text1: result.success ? result.message : 'Something went wrong',
      text2: result.success ? undefined : result.error.message,
    });

  // The CVC is only validated to mimic a real checkout; it is never stored or sent.
  const onSubmit = async ({ cardNumber: number, expiryDate: expiry }) => {
    const card = { fecha_expiracion: expiryToDate(expiry) };
    if (!isEditing) {
      card.last4 = getLast4(number);
      card.marca = detectCardBrand(number);
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

  const inputProps = {
    mode: 'outlined',
    outlineStyle: styles.outline,
    style: styles.input,
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <CardPreview
          brand={brand}
          number={cardNumber}
          last4={isEditing ? cardDetails?.last4 : undefined}
          holder={holderName}
          expiry={expiryDate}
        />

        <View style={styles.form}>
          {isEditing ? (
            <TextInput
              {...inputProps}
              label="Card number"
              value={maskCardNumber(cardDetails?.last4)}
              disabled
            />
          ) : (
            <Controller
              name="cardNumber"
              control={control}
              rules={{
                required: 'Enter your card number',
                validate: (value) => isValidCardNumber(value) || 'This card number is not valid',
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  {...inputProps}
                  label="Card number"
                  placeholder="4242 4242 4242 4242"
                  keyboardType="number-pad"
                  value={value}
                  onBlur={onBlur}
                  onChangeText={(text) => onChange(formatCardNumber(text))}
                  error={!!errors.cardNumber}
                  left={<TextInput.Icon icon="credit-card-outline" />}
                />
              )}
            />
          )}
          <FieldError error={errors.cardNumber} />

          <View style={styles.row}>
            <View style={styles.half}>
              <Controller
                name="expiryDate"
                control={control}
                rules={{
                  required: 'Required',
                  validate: (value) => isValidExpiry(value) || 'Invalid or expired',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    {...inputProps}
                    label="Expiry"
                    placeholder="MM/YY"
                    keyboardType="number-pad"
                    value={value}
                    onBlur={onBlur}
                    onChangeText={(text) => onChange(formatExpiry(text))}
                    error={!!errors.expiryDate}
                  />
                )}
              />
              <FieldError error={errors.expiryDate} />
            </View>
            {!isEditing ? (
              <View style={styles.half}>
                <Controller
                  name="cvc"
                  control={control}
                  rules={{
                    validate: (value) => /^\d{3,4}$/.test(value) || '3 or 4 digits',
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      {...inputProps}
                      label="CVC"
                      placeholder="123"
                      keyboardType="number-pad"
                      secureTextEntry
                      value={value}
                      onBlur={onBlur}
                      onChangeText={(text) => onChange(onlyDigits(text).slice(0, 4))}
                      error={!!errors.cvc}
                    />
                  )}
                />
                <FieldError error={errors.cvc} />
              </View>
            ) : null}
          </View>

          <Controller
            name="holderName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                {...inputProps}
                label="Name on card"
                value={value}
                onChangeText={onChange}
                autoCapitalize="words"
                left={<TextInput.Icon icon="account-outline" />}
              />
            )}
          />

          <View style={styles.notice}>
            <MaterialCommunityIcons name="shield-lock-outline" size={18} color={colors.success} />
            <Text variant="bodySmall" style={styles.noticeText}>
              Only the card brand and last 4 digits are saved. The full number and CVC never leave
              your device.
            </Text>
          </View>

          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {isEditing ? 'Save changes' : 'Save card'}
          </Button>
          {isEditing ? (
            <Button
              icon="trash-can-outline"
              textColor={colors.error}
              onPress={handleDelete}
              style={styles.delete}
            >
              Remove card
            </Button>
          ) : null}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  form: {
    marginTop: spacing.xxl,
    gap: spacing.xs,
  },
  input: {
    backgroundColor: colors.surface,
  },
  outline: {
    borderRadius: radius.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  half: {
    flex: 1,
  },
  error: {
    color: colors.error,
    marginLeft: spacing.xs,
    marginBottom: spacing.xs,
  },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    backgroundColor: colors.successSoft,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  noticeText: {
    flex: 1,
    color: colors.text,
  },
  button: {
    marginTop: spacing.xl,
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
  delete: {
    marginTop: spacing.sm,
  },
});
