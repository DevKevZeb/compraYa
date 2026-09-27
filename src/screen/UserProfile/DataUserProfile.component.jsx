import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { supabase } from '../../../lib/initSupaBase';
import { CustomInputComponent } from '../../components/CustomInput.component';
import { DataUserSchema } from '../../models/form.model';
import { useUserStore } from '../../Stores/user.store';

export const DataUserProfile = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(DataUserSchema),
    mode: 'onBlur',
  });

  const [loading, setLoading] = useState(false);
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setValue('name', user.nombre_usuario);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const showError = (message) =>
    Toast.show({ type: 'error', text1: 'Error', text2: message, duration: 1000 });

  const onSubmit = async ({ name, email }) => {
    setLoading(true);

    const { error: updateError } = await supabase
      .from('usuarios')
      .update({ nombre_usuario: name })
      .eq('usuario_id', user.userId);

    if (updateError) {
      setLoading(false);
      showError('No se pudo actualizar el nombre del usuario.');
      return;
    }

    // Email changes go through Supabase Auth, which sends a confirmation email.
    // A database trigger mirrors the confirmed address into the profile.
    const emailChanged = email !== user.email;
    if (emailChanged) {
      const { error: authError } = await supabase.auth.updateUser({ email });
      if (authError) {
        setLoading(false);
        showError('No se pudo actualizar el correo electrónico del usuario.');
        return;
      }
    }

    setUser({ ...user, nombre_usuario: name });
    setLoading(false);

    Toast.show({
      type: 'success',
      text1: 'Éxito',
      text2: emailChanged
        ? 'Datos actualizados. Revisa tu correo para confirmar la nueva dirección.'
        : 'Datos actualizados correctamente.',
      duration: 1500,
    });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={{ textAlign: 'left' }}>
          <Text variant="headlineSmall" style={{ marginTop: 10 }}>
            Actualiza tus datos por favor.
          </Text>
        </View>
        <CustomInputComponent
          name="name"
          control={control}
          label="Nombre"
          defaultValue={user.nombre_usuario}
          type="text"
          error={errors.name}
        />
        <CustomInputComponent
          name="email"
          control={control}
          label="Email"
          defaultValue={user.email}
          type="email"
          error={errors.email}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          loading={loading} // Mostrar animación de carga en el botón
        >
          Actualizar Datos
        </Button>
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
});
