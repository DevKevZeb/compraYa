import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { STORE_LOCATION } from '../../config/store';
import { geocodeAddress, getRoute } from '../../services/maps.service';

export const DeliveryMapComponent = ({ route }) => {
  const { direccion_envio } = route.params || {};
  const addressTest = direccion_envio ?? '';
  const [myDestination, setmyDestination] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const origin = STORE_LOCATION;
  const initialRegion = {
    latitude: origin.latitude,
    longitude: origin.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  useEffect(() => {
    if (!myDestination) {
      return;
    }
    getRoute(origin, myDestination)
      .then((result) => setRouteCoordinates(result?.coordinates ?? []))
      .catch(() => setRouteCoordinates([]));
  }, [origin, myDestination]);

  useEffect(() => {
    if (addressTest.length > 0) {
      geocodeAddress(addressTest).then(setmyDestination);
    } else {
      getCurrentLocation();
    }
  }, [addressTest]);
  async function getCurrentLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setmyDestination({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        cameraZoomRange={5}
      >
        {/* Store Marker */}
        <Marker
          coordinate={origin}
          title="Tienda"
          description="Punto de origen del pedido"
          pinColor="green"
        />

        {myDestination && (
          <Marker
            coordinate={myDestination}
            title="Destino"
            description="Ubicación de entrega"
            pinColor="red"
          />
        )}

        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeColor="#9C7CFE" strokeWidth={6} />
        )}
      </MapView>
      <Text style={styles.infoText}>Tu pedido está en camino.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  infoText: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
});
