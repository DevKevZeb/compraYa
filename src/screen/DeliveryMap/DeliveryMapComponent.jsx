import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Text,
	PermissionsAndroid,
	Platform,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_KEY } from '@env';

export const DeliveryMapComponent = () => {
	const [origin, setorigin] = useState({
		latitude: -17.393862717524335, // Ejemplo con coordenadas de la umss
		longitude: -66.14728339607203,
	});
	const [destination, setdestination] = useState({
		latitude: -17.394862717524335, // Ubicación cercana a la umss
		longitude: -66.14828339607203,
	});

	const [currentLocation, setCurrentLocation] = useState(null);
	const [initialRegion, setInitialRegion] = useState({
		latitude: origin.latitude,
		longitude: origin.longitude,
		latitudeDelta: 0.1,
		longitudeDelta: 0.1,
	});
  
	useEffect(() => {
		getCurrentLocation();
	}, []);
	async function getCurrentLocation() {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		setCurrentLocation(location);
		const current = {
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
		};
		setdestination(current);
	}

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
					coordinate={origin}
					title='Tienda'
					description='Punto de origen del pedido'
					pinColor='green'
				/>

				{/* Delivery Destination Marker */}
				<Marker
					coordinate={destination}
					title='Destino'
					description='Ubicación de entrega'
					pinColor='red'
				/>

				{/* Tracking Line */}
				{/* {currentLocation && (
          <Polyline
            coordinates={[
              origin,
              destination
            ]}
            strokeColor="#9C7CFE"
            strokeWidth={3}
          />
        )} */}
				<MapViewDirections
					origin={origin}
					destination={destination}
					apikey={GOOGLE_MAPS_KEY}
					strokeColor='#9C7CFE'
					strokeWidth={6}
				/>
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
