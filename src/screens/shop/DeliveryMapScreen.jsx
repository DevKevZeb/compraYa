import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Surface, Text } from 'react-native-paper';
import { RouteMap } from '../../components/RouteMap';
import { STORE_LOCATION } from '../../config/store';
import { geocodeAddress, getRoute } from '../../services/maps';

// Without an address, fall back to the device location as the destination.
const getCurrentPosition = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Necesitamos permiso de ubicación para mostrar la ruta.');
  }
  const { coords } = await Location.getCurrentPositionAsync({});
  return { latitude: coords.latitude, longitude: coords.longitude };
};

export const DeliveryMapScreen = ({ route }) => {
  const address = route.params?.direccion_envio?.trim() ?? '';
  const [destination, setDestination] = useState(null);
  const [deliveryRoute, setDeliveryRoute] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus({ loading: true, error: null });
      try {
        const target = address ? await geocodeAddress(address) : await getCurrentPosition();
        if (!target) {
          throw new Error('No encontramos la dirección de entrega en el mapa.');
        }
        if (cancelled) return;
        setDestination(target);

        const result = await getRoute(STORE_LOCATION, target);
        if (cancelled) return;
        setDeliveryRoute(result);
        setStatus({
          loading: false,
          error: result ? null : 'No hay una ruta disponible hasta la dirección.',
        });
      } catch (error) {
        if (!cancelled) {
          setStatus({ loading: false, error: error.message });
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <View style={styles.container}>
      <RouteMap
        store={STORE_LOCATION}
        destination={destination}
        route={deliveryRoute?.coordinates}
      />

      <Surface style={styles.infoCard} elevation={3}>
        {status.loading ? (
          <View style={styles.row}>
            <ActivityIndicator size="small" color="#9C7CFE" />
            <Text style={styles.infoText}>Calculando la ruta de entrega...</Text>
          </View>
        ) : status.error ? (
          <Text style={styles.errorText}>{status.error}</Text>
        ) : (
          <>
            <Text variant="titleMedium">Tu pedido está en camino</Text>
            <Text variant="bodyMedium">
              {deliveryRoute.distanceKm.toFixed(1)} km · aprox.{' '}
              {Math.max(1, Math.round(deliveryRoute.durationMin))} min
            </Text>
          </>
        )}
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoCard: {
    position: 'absolute',
    bottom: 24,
    left: 16,
    right: 16,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    marginLeft: 10,
  },
  errorText: {
    color: '#B3261E',
  },
});
