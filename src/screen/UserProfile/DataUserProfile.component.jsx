import React, { useState, useCallback } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Importar useFocusEffect
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-toast-message';
import { CustomInputComponent } from '../../components/CustomInput.component';
import { DataUserSchema } from '../../models/form.model';
import { useUserStore } from '../../Stores/user.store';
import { supabase } from '../../../lib/initSupaBase';
import { useEffect } from 'react';

export const DataUserProfile = ({ navigation }) => {
    const {
        control,
        handleSubmit,
        reset,
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

    const [loading, setLoading] = useState(false); // Estado de carga
    const setUser = useUserStore((state) => state.setUser);
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (user) {
            setValue('name', user.nombre_usuario);
            setValue('email', user.email);
        }
    }, [user, setValue]);

    useFocusEffect(
        useCallback(() => {
            const onBackPress = () => {
                navigation.goBack();
                return true;
            };

            BackHandler.addEventListener('hardwareBackPress', onBackPress);

            return () =>
                BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }, [navigation])
    );


    const onSubmit = async (data) => {
        setLoading(true); // Iniciar carga
        const { name, email } = data;

        // Actualizar el nombre del usuario en la tabla "usuarios"
        const { error: updateError } = await supabase
            .from('usuarios')
            .update({ nombre_usuario: name, correo_electronico: email })
            .eq('correo_electronico', user.email);

        if (updateError) {
            setLoading(false); // Detener carga
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se pudo actualizar el nombre del usuario.',
                duration: 1000,
            });
            return;
        }

        // Actualizar el correo electrónico del usuario autenticado
        const { error: authError } = await supabase.auth.updateUser({
            email: email,
        });

        if (authError) {
            setLoading(false); // Detener carga
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'No se pudo actualizar el correo electrónico del usuario.',
                duration: 1000,
            });
            return;
        }

        // Actualizar el estado global con los nuevos datos del usuario
        setUser({
            ...user,
            nombre_usuario: name,
            email: email,
        });

        // Mostrar notificación de éxito
        Toast.show({
            type: 'success',
            text1: 'Éxito',
            text2: 'La información del usuario se actualizó correctamente. Por favor, verifica tu nuevo correo electrónico.',
            duration: 1000,
        });

        // Redirigir a la pantalla de inicio de sesión
        navigation.navigate('SignIn');
        setLoading(false); // Detener carga
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={{ textAlign: 'left' }}>
                    <Text variant='headlineSmall' style={{ marginTop: 10 }}>
                        Actualiza tus datos por favor.
                    </Text>
                </View>
                <CustomInputComponent
                    name='name'
                    control={control}
                    label='Nombre'
                    defaultValue={user.nombre_usuario}
                    type='text'
                    error={errors.name}
                />
                <CustomInputComponent
                    name='email'
                    control={control}
                    label='Email'
                    defaultValue={user.email} 
                    type='email'
                    error={errors.email}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    mode='contained'
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