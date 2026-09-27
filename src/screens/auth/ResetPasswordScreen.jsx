import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../lib/supabase';
import { FormInput } from '../../components/FormInput';
import { RecoverySchema } from '../../schemas/forms';
import { useUserStore } from '../../stores/user.store';

// Shown after the user opens the password reset link, with a recovery session active.
export const ResetPasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RecoverySchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const setPasswordRecovery = useUserStore((state) => state.setPasswordRecovery);

  const onSubmit = async ({ password }) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Contraseña actualizada',
      text2: 'Ya puedes usar tu nueva contraseña.',
    });
    setPasswordRecovery(false);
  };

  const onCancel = async () => {
    setPasswordRecovery(false);
    await supabase.auth.signOut();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.text}>
        Elige una nueva contraseña para tu cuenta.
      </Text>
      <View style={styles.inputContainer}>
        <FormInput
          name="password"
          control={control}
          label="Contraseña"
          placeholder="Nueva contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.password}
        />
        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirmar contraseña"
          placeholder="Repite la contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.confirmPassword}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
        >
          Actualizar
        </Button>
        <Button mode="text" onPress={onCancel} disabled={loading} style={styles.cancel}>
          Cancelar
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EADDFF',
    flex: 1,
    paddingTop: 80,
  },
  text: {
    textAlign: 'center',
    marginHorizontal: 24,
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#9C7CFE',
    marginTop: 60,
    width: '50%',
  },
  cancel: {
    marginTop: 12,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
