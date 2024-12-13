import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserStore } from '../../Stores/user.store';
import { supabase } from '../../../lib/initSupaBase';
import { SafeAreaView } from 'react-native-safe-area-context';

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
			<View>
				<Text variant='headlineSmall'>Nombre Completo:</Text>
				<Text variant='titleMedium' style={styles.textContent}>
					{user.nombre_usuario}
				</Text>

				<Text variant='headlineSmall'>Correo Electronico:</Text>
				<Text variant='titleMedium' style={styles.textContent}>
					{user.email}
				</Text>
			</View>
			<View style={styles.scrollContainer}>
				<Text variant='headlineSmall' style={styles.text}>
					Historial pedidos
				</Text>
				<SafeAreaView
					style={styles.safeContainer}
					edges={['left', 'right', 'bottom']}
				>
					<ScrollView>
						{/* todo:usar el customItemDetails para renderizar los productos seleccionados usan renderizado condicional */}
					</ScrollView>
				</SafeAreaView>
			</View>
            <View style={styles.scrollContainer}>
				<Text variant='headlineSmall' style={styles.text}>
					Pedidos en curso
				</Text>
				<SafeAreaView
					style={styles.safeContainer}
					edges={['left', 'right', 'bottom']}
				>
					<ScrollView>
						{/* todo:usar el customItemDetails para renderizar los productos seleccionados usan renderizado condicional aqui usaremos como envoltura el Touchable opacity */}
					</ScrollView>
				</SafeAreaView>
			</View>
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
		flex: 1,
		padding: 15,
	},
	textLink: {
		color: '#0866FF',
		marginTop: 15,
	},
	textContent: {
		marginTop: 10,
		marginBottom: 10,
	},
	scrollContainer: {
		flex: 1,
		marginBottom: 10,
	},
	safeContainer: {
		flex: 1,
		borderColor: 'gray',
		padding: 6,
		borderWidth: 0.2,
		borderRadius: 5,
	},
	text: {
		paddingBottom: 10,
	},
});
