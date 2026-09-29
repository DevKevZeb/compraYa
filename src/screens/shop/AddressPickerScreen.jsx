import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import * as Location from 'expo-location';
import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Searchbar,
  Text,
  TextInput,
} from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { LocationPickerMap } from '../../components/LocationPickerMap';
import { DELIVERY_AREA } from '../../config/store';
import { reverseGeocode, searchPlaces } from '../../services/maps';
import { buildDeliveryAddress, useCheckoutStore } from '../../stores/checkout.store';
import { colors, fontFamilies, radius, shadows, spacing } from '../../theme';
import { deliveryViewbox, isWithinDeliveryArea } from '../../utils/geo';

const SEARCH_DEBOUNCE_MS = 450;
const REVERSE_DEBOUNCE_MS = 350;
const VIEWBOX = deliveryViewbox();

// Full-screen map of the delivery area where the customer drops a pin.
export const AddressPickerScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const saved = useCheckoutStore((state) => state.deliveryLocation);
  const setDeliveryLocation = useCheckoutStore((state) => state.setDeliveryLocation);
  const map = useRef(null);

  const [point, setPoint] = useState(
    saved ? { latitude: saved.latitude, longitude: saved.longitude } : DELIVERY_AREA.center
  );
  const [label, setLabel] = useState(saved?.label ?? '');
  const [resolving, setResolving] = useState(!saved);
  const [reference, setReference] = useState(saved?.reference ?? '');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [locating, setLocating] = useState(false);

  const inside = isWithinDeliveryArea(point);

  // Describe the pin whenever it moves (debounced, ignoring stale answers).
  useEffect(() => {
    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const place = await reverseGeocode(point);
        if (!cancelled) setLabel(place ?? 'Pinned location');
      } catch {
        if (!cancelled) setLabel('Pinned location');
      } finally {
        if (!cancelled) setResolving(false);
      }
    }, REVERSE_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [point]);

  // Suggestions for the search box, limited to the delivery area.
  useEffect(() => {
    const text = query.trim();
    if (text.length < 3) return undefined;
    let cancelled = false;
    const timeout = setTimeout(async () => {
      try {
        const places = await searchPlaces(text, VIEWBOX);
        if (!cancelled) setResults(places.filter((place) => isWithinDeliveryArea(place)));
      } catch {
        if (!cancelled) setResults([]);
      }
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query]);

  const movePin = (next, { fromMap = false } = {}) => {
    setResolving(true);
    setPoint({ latitude: next.latitude, longitude: next.longitude });
    if (!fromMap) map.current?.moveTo(next);
  };

  const onSearchChange = (text) => {
    setQuery(text);
    if (text.trim().length < 3) setResults([]);
  };

  const chooseResult = (place) => {
    setQuery('');
    setResults([]);
    movePin(place);
  };

  const useMyLocation = async () => {
    setLocating(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({ type: 'error', text1: 'Location permission denied' });
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      const here = { latitude: coords.latitude, longitude: coords.longitude };
      // Keep the pin inside the delivery area instead of jumping to another city.
      if (!isWithinDeliveryArea(here)) {
        Toast.show({
          type: 'info',
          text1: 'You are outside our delivery area',
          text2: `We deliver within ${DELIVERY_AREA.radiusKm} km of ${DELIVERY_AREA.name}.`,
        });
        return;
      }
      movePin(here);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Could not get your location', text2: error.message });
    } finally {
      setLocating(false);
    }
  };

  const confirm = () => {
    setDeliveryLocation({
      ...point,
      label,
      reference: reference.trim(),
      address: buildDeliveryAddress(label, reference),
    });
    navigation.goBack();
  };

  return (
    <View style={styles.screen}>
      <LocationPickerMap
        ref={map}
        area={DELIVERY_AREA}
        initial={point}
        onPick={(next) => movePin(next, { fromMap: true })}
      />

      <View style={[styles.top, { paddingTop: insets.top + spacing.sm }]}>
        <View style={styles.searchRow}>
          <IconButton
            icon="chevron-left"
            size={24}
            mode="contained"
            containerColor={colors.surface}
            onPress={navigation.goBack}
            accessibilityLabel="Go back"
            style={styles.roundButton}
          />
          <Searchbar
            placeholder={`Search in ${DELIVERY_AREA.name}`}
            value={query}
            onChangeText={onSearchChange}
            style={styles.search}
            inputStyle={styles.searchInput}
            elevation={0}
          />
        </View>
        {results.length > 0 ? (
          <View style={styles.results}>
            {results.map((item, index) => (
              <Pressable
                key={item.id}
                onPress={() => chooseResult(item)}
                style={[styles.result, index > 0 && styles.resultDivider]}
                accessibilityRole="button"
              >
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={20}
                  color={colors.primary}
                />
                <View style={styles.flex}>
                  <Text variant="bodyMedium" numberOfLines={1} style={styles.text}>
                    {item.label}
                  </Text>
                  <Text variant="bodySmall" numberOfLines={1} style={styles.muted}>
                    {item.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      <IconButton
        icon="crosshairs-gps"
        mode="contained"
        containerColor={colors.surface}
        iconColor={colors.primary}
        onPress={useMyLocation}
        disabled={locating}
        accessibilityLabel="Use my current location"
        style={styles.locate}
      />

      <View style={[styles.sheet, { paddingBottom: insets.bottom + spacing.lg }]}>
        <Text variant="labelMedium" style={styles.eyebrow}>
          DELIVER TO
        </Text>
        <View style={styles.addressRow}>
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color={inside ? colors.primary : colors.error}
          />
          {resolving ? (
            <View style={styles.resolving}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text variant="bodyMedium" style={styles.muted}>
                Finding the address…
              </Text>
            </View>
          ) : (
            <Text variant="titleMedium" style={styles.address} numberOfLines={2}>
              {label}
            </Text>
          )}
        </View>

        <View style={[styles.area, inside ? styles.areaOk : styles.areaOut]}>
          <MaterialCommunityIcons
            name={inside ? 'check-circle-outline' : 'alert-circle-outline'}
            size={16}
            color={inside ? colors.success : colors.error}
          />
          <Text variant="bodySmall" style={{ color: inside ? colors.success : colors.error }}>
            {inside
              ? `Within our ${DELIVERY_AREA.name} delivery area`
              : `We only deliver within ${DELIVERY_AREA.radiusKm} km of ${DELIVERY_AREA.name}'s city center`}
          </Text>
        </View>

        {!inside ? (
          <Button
            compact
            icon="crosshairs"
            onPress={() => movePin(DELIVERY_AREA.center)}
            style={styles.recenter}
          >
            Back to {DELIVERY_AREA.name}
          </Button>
        ) : null}

        <TextInput
          mode="outlined"
          label="Apartment, floor or reference (optional)"
          placeholder="e.g. Apt 3B, blue door"
          value={reference}
          onChangeText={setReference}
          outlineStyle={styles.outline}
          style={styles.reference}
          dense
        />

        <Button
          mode="contained"
          onPress={confirm}
          disabled={!inside || resolving}
          style={styles.confirm}
          contentStyle={styles.confirmContent}
        >
          Confirm location
        </Button>
        <Text variant="bodySmall" style={styles.hint}>
          Tap the map or drag the pin to adjust the exact spot.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
  top: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  roundButton: {
    margin: 0,
    ...shadows.card,
  },
  search: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.card,
  },
  searchInput: {
    fontFamily: fontFamilies.regular,
  },
  results: {
    marginTop: spacing.sm,
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.raised,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  resultDivider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.border,
  },
  locate: {
    position: 'absolute',
    right: spacing.md,
    bottom: 330,
    ...shadows.card,
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
    paddingTop: spacing.lg,
    ...shadows.raised,
  },
  eyebrow: {
    color: colors.textSubtle,
    letterSpacing: 1,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xs,
    minHeight: 48,
  },
  resolving: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  address: {
    flex: 1,
    color: colors.text,
  },
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  areaOk: {
    backgroundColor: colors.successSoft,
  },
  areaOut: {
    backgroundColor: colors.errorSoft,
  },
  recenter: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  reference: {
    marginTop: spacing.md,
    backgroundColor: colors.surface,
  },
  outline: {
    borderRadius: radius.md,
  },
  confirm: {
    marginTop: spacing.md,
    borderRadius: radius.pill,
  },
  confirmContent: {
    height: 50,
  },
  hint: {
    color: colors.textSubtle,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
