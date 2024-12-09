import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, PermissionsAndroid, Platform } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';

export const DeliveryMapComponent = () => {
  // Store location (fixed location)
  const STORE_LOCATION = {
    latitude: 19.4326,  // Example Mexico City coordinates
    longitude: -99.1332,
  };

  // Delivery destination location
  const DELIVERY_LOCATION = {
    latitude: 19.4400,  // Slightly different location
    longitude: -99.1500,
  };

  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState({
    latitude: STORE_LOCATION.latitude,
    longitude: STORE_LOCATION.longitude,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });

  // Request location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  // Get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({
          latitude,
          longitude,
        });
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        });
      },
      (error) => {
        console.log('GetCurrentLocation Error', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Effect to request permission and get location
  useEffect(() => {
    const getLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        // getCurrentLocation();
      }
    };

    getLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* Store Marker */}
        <Marker
          coordinate={STORE_LOCATION}
          title="Tienda"
          description="Punto de origen del pedido"
          pinColor="green"
        />

        {/* Delivery Destination Marker */}
        <Marker
          coordinate={DELIVERY_LOCATION}
          title="Destino"
          description="Ubicación de entrega"
          pinColor="red"
        />

        {/* Tracking Line */}
        {currentLocation && (
          <Polyline
            coordinates={[
              currentLocation,
              STORE_LOCATION,
              DELIVERY_LOCATION
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
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
