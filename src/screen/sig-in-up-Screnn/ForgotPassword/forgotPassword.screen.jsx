import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, Button, Divider } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Linking from 'expo-linking';
import Toast from 'react-native-toast-message';
import { supabase } from '../../../../lib/initSupaBase';
import { PASSWORD_RESET_PATH } from '../../../services/auth.service';

import { CustomInputComponent } from '../../../components/CustomInput.component';
import { ForgotSchema } from '../../../models/form.model';
import face from '../../../../assets/face.png';
import google from '../../../../assets/google.png';
export const ForgotPassword = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(ForgotSchema),
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email }) => {
    setLoading(true);
    // The email link opens the app (see RootNavigation), which then asks for a new password.
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: Linking.createURL(PASSWORD_RESET_PATH),
    });
    setLoading(false);

    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error.message });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Correo enviado',
      text2: 'Abre el enlace del correo desde este teléfono para crear una nueva contraseña.',
      visibilityTime: 6000,
    });
    reset();
    navigation.navigate('SignIn');
  };
  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.text}>
        Has olvidado tu contraseña? !No te preocupes! eso ocurre, Ingrese la direccion de correro
        electronico vinculada con su cuenta.
      </Text>
      <View style={styles.inputContainer}>
        <CustomInputComponent
          name="email"
          control={control}
          label="Email"
          placeholder="Ingresa tu email"
          type="email"
          error={errors.email}
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
          Enviar
        </Button>
      </View>
      <Divider horizontalInset={true} bold={true} style={{ marginTop: 100 }} />
      <Text variant="titleMedium" style={styles.text}>
        O ingresa con
      </Text>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={face} on />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Image source={google} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text variant="titleSmall">Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text variant="titleSmall" style={{ color: '#0866FF' }}>
            Ingresa ahora
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#EADDFF',
  },
  text: {
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
  },
  button: {
    backgroundColor: '#9C7CFE',
    marginTop: 100,
    width: '50%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 50,
    marginTop: 40,
    marginBottom: 60,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
});
