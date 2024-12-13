import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { useUserStore } from '../../Stores/user.store';
import { supabase } from '../../../lib/initSupaBase';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CustomListItemComponent } from '../../components/customListItem.component';

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
						<CustomListItemComponent>
							<View style={styles.history}>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Numero de orden:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										{' '}
										123
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Direccion envio:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										{' '}
										ayacucho esquina heroinas
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Monto Total:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										100 Bs
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Costo Envio:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										10 Bs
									</Text>
								</View>
							</View>
						</CustomListItemComponent>
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
						<CustomListItemComponent>
							<View style={styles.history}>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Numero de orden:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										{' '}
										123
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Direccion envio:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										{' '}
										ayacucho esquina heroinas
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Monto Total:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										100 Bs
									</Text>
								</View>
								<View style={styles.historyText}>
									<Text variant='titleMedium'>Costo Envio:</Text>
									<Text variant='titleSmall' style={styles.valueText}>
										10 Bs
									</Text>
									<TouchableOpacity
										onPress={() => navigation.navigate('DeliveryMap')}
										style={styles.linkPedido}
									>
										<Text variant='bodyMedium' style={styles.textLink}>
											ver en camino
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						</CustomListItemComponent>
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
	history: {
		flexDirection: 'column',
		paddingTop: 5,
	},
	historyText: {
		flexDirection: 'row',
	},
	valueText: {
		paddingTop: 3,
	},
	linkPedido: {
		marginLeft: 100,
		paddingTop: 0,
	},
});
