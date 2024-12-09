import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserStore } from '../../Stores/user.store';
import { supabase } from '../../../lib/initSupaBase';

export const UserProfile = ({ navigation }) => {
    const user = useUserStore((state) => state.user);
    const clearUser = useUserStore((state) => state.clearUser);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        clearUser();
        navigation.navigate('SignIn');
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text variant='headlineSmall'>Cargando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text variant='headlineSmall'>Nombre Completo:</Text>
            <Text variant='titleMedium' style={styles.textContent}>
                {user.nombre_usuario}
            </Text>

            <Text variant='headlineSmall'>Correo Electronico:</Text>
            <Text variant='titleMedium' style={styles.textContent}>
                {user.email}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('DataUserProfile')}>
                <Text variant='bodyMedium' style={styles.textLink}>
                    ¿Desea actualizar sus datos?
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignOut}>
                <Text variant='bodyMedium' style={styles.textLink}>
                    Cerrar sesión
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
		padding: 20,
		flexDirection: 'column',
	},
	textLink: {
		color: '#0866FF',
		marginTop: 15,
	},
	textContent: {
		marginTop: 10,
		marginBottom: 10,
	},
});