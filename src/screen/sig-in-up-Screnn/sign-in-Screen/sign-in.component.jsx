import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../../../lib/initSupaBase';
import { CustomInputComponent } from '../../../components/CustomInput.component';
import { SigInSchema } from '../../../models/form.model';

export const SignInComponent = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SigInSchema),
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const { email, password } = data;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Correo o contraseña invalidos. Por favor, inténtalo de nuevo.',
        duration: 1000,
      });
      return;
    }

    // The root navigator switches to the main app once the session is set.
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Inicio de sesión exitoso',
      duration: 1000,
    });
    reset();
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineSmall" style={styles.text}>
        Bienvenido de nuevo todo lo que buscas lo encuentras aquí.
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
        <CustomInputComponent
          name="password"
          control={control}
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          secureTextEntry={true}
          type="password"
          error={errors.password}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={styles.textInput}
        >
          <Text variant="titleSmall">¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        >
          Ingresar
        </Button>
      </View>
      <View style={styles.textContainer}>
        <Text variant="titleSmall">¿No tienes cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text variant="titleSmall" style={{ color: '#0866FF' }}>
            Regístrate ahora
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaddff',
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    width: '80%',
    marginTop: 30,
  },
  textInput: {
    width: '80%',
    marginTop: 10,
    textDecorationLine: 'underline',
    marginLeft: 309,
  },
  button: {
    backgroundColor: '#9C7CFE',
    marginTop: 75,
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
