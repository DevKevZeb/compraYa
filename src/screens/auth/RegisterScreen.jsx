import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../lib/supabase';
import { FormInput } from '../../components/FormInput';
import { RegisterSchema } from '../../schemas/forms';

export const RegisterScreen = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(RegisterSchema),
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { name, email, password } = data;

    // The profile row is created by the on_auth_user_created database trigger,
    // which reads the display name from the user metadata.
    const { data: signUpData, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre_usuario: name } },
    });

    setLoading(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
      return;
    }

    reset();

    // With email confirmation disabled Supabase signs the user in right away
    // and the root navigator takes over.
    if (signUpData.session) {
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Cuenta creada',
      text2: 'Por favor, verifica tu correo electrónico para completar el registro.',
    });
    navigation.navigate('SignIn');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.text}>
        ¡Bienvenido! Regístrate para comenzar.
      </Text>
      <View style={styles.inputContainer}>
        <FormInput
          name="name"
          control={control}
          label="Nombre"
          placeholder="Nombre completo"
          type="text"
          error={errors.name}
        />
        <FormInput
          name="email"
          control={control}
          label="Email"
          placeholder="Ingresa tu email"
          type="email"
          error={errors.email}
        />
        <FormInput
          name="password"
          control={control}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.password}
        />
        <FormInput
          name="confirmPassword"
          control={control}
          label="Confirmar"
          placeholder="Confirma tu contraseña"
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
        >
          Registrarte
        </Button>
      </View>
      <View style={styles.textContainer}>
        <Text variant="titleSmall">¿Ya tienes una cuenta? </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginTop: 30,
  },
  button: {
    backgroundColor: '#9C7CFE',
    marginTop: 40,
    width: '70%',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
});
