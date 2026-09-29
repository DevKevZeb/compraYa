import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RouteMap } from '../../components/RouteMap';
import { StatusChip } from '../../components/ui';
import { STORE_LOCATION } from '../../config/store';
import { geocodeAddress, getRoute } from '../../services/maps';
import { colors, radius, shadows, spacing } from '../../theme';

// Without an address, fall back to the device location as the destination.
const getCurrentPosition = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Allow location access to see the delivery route.');
  }
  const { coords } = await Location.getCurrentPositionAsync({});
  return { latitude: coords.latitude, longitude: coords.longitude };
};

const Stop = ({ icon, color, label, value, last }) => (
  <View style={styles.stop}>
    <View style={styles.stopRail}>
      <View style={[styles.stopIcon, { backgroundColor: color }]}>
        <MaterialCommunityIcons name={icon} size={14} color={colors.onPrimary} />
      </View>
      {!last ? <View style={styles.stopLine} /> : null}
    </View>
    <View style={styles.stopText}>
      <Text variant="labelMedium" style={styles.muted}>
        {label}
      </Text>
      <Text variant="bodyMedium" style={styles.text} numberOfLines={2}>
        {value}
      </Text>
    </View>
  </View>
);

export const DeliveryMapScreen = ({ route }) => {
  const insets = useSafeAreaInsets();
  const order = route.params?.order;
  const address = (order?.direccion_envio ?? route.params?.direccion_envio ?? '').trim();
  // Orders store the exact point picked on the map; older ones only have an address.
  const savedLat = order?.latitud;
  const savedLng = order?.longitud;
  const [destination, setDestination] = useState(null);
  const [deliveryRoute, setDeliveryRoute] = useState(null);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setStatus({ loading: true, error: null });
      try {
        const target =
          savedLat != null && savedLng != null
            ? { latitude: savedLat, longitude: savedLng }
            : address
              ? await geocodeAddress(address)
              : await getCurrentPosition();
        if (!target) {
          throw new Error('We could not find the delivery address on the map.');
        }
        if (cancelled) return;
        setDestination(target);

        const result = await getRoute(STORE_LOCATION, target);
        if (cancelled) return;
        setDeliveryRoute(result);
        setStatus({
          loading: false,
          error: result ? null : 'There is no driving route to this address.',
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
  }, [address, savedLat, savedLng]);

  const eta = deliveryRoute ? Math.max(1, Math.round(deliveryRoute.durationMin)) : null;

  return (
    <View style={styles.container}>
      <RouteMap
        store={STORE_LOCATION}
        destination={destination}
        route={deliveryRoute?.coordinates}
        bottomInset={300}
      />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.handle} />

        {status.loading ? (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.primary} />
            <Text variant="bodyMedium" style={styles.text}>
              Calculating the delivery route…
            </Text>
          </View>
        ) : status.error ? (
          <View style={styles.loadingRow}>
            <MaterialCommunityIcons
              name="map-marker-alert-outline"
              size={22}
              color={colors.error}
            />
            <Text variant="bodyMedium" style={styles.error}>
              {status.error}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.headerRow}>
              <View style={styles.flex}>
                <Text variant="titleLarge" style={styles.text}>
                  Arriving in ~{eta} min
                </Text>
                <Text variant="bodyMedium" style={styles.muted}>
                  {deliveryRoute.distanceKm.toFixed(1)} km from the store
                  {order ? ` · ${order.numero_seguimiento}` : ''}
                </Text>
              </View>
              <StatusChip label="On the way" tone="warning" />
            </View>

            <View style={styles.progress}>
              <View style={[styles.progressBar, styles.progressDone]} />
              <View style={[styles.progressBar, styles.progressDone]} />
              <View style={[styles.progressBar, styles.progressActive]} />
              <View style={styles.progressBar} />
            </View>

            <Stop
              icon="storefront-outline"
              color={colors.success}
              label="FROM"
              value="CompraYa store"
            />
            <Stop
              icon="map-marker"
              color={colors.error}
              label="TO"
              value={address || 'Your location'}
              last
            />
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    ...shadows.raised,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  flex: {
    flex: 1,
  },
  text: {
    color: colors.text,
  },
  muted: {
    color: colors.textMuted,
  },
  error: {
    color: colors.error,
    flex: 1,
  },
  progress: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginVertical: spacing.lg,
  },
  progressBar: {
    flex: 1,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  progressDone: {
    backgroundColor: colors.success,
  },
  progressActive: {
    backgroundColor: colors.primary,
  },
  stop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stopRail: {
    alignItems: 'center',
  },
  stopIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopLine: {
    width: 2,
    flex: 1,
    minHeight: 14,
    backgroundColor: colors.border,
  },
  stopText: {
    flex: 1,
    paddingBottom: spacing.md,
  },
});
