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
import axios from 'axios';
import { LogBox } from 'react-native';
import { GOOGLE_MAPS_KEY } from '@env';

export const DeliveryMapComponent = () => {
	const addressTest = 'calle calama esquina san martin';
	LogBox.ignoreLogs([
		'MapViewDirections Error: Error on GMAPS route request: NOT_FOUND',
		'Directions error: Error on GMAPS route request: NOT_FOUND',
	  ]);
	const [myDestination, setmyDestination] = useState({
		latitude: 0,
		longitude: 0,
	});
	const [origin, setorigin] = useState({
		latitude: -17.393862717524335, // Ejemplo con coordenadas de la umss
		longitude: -66.14728339607203,
	});
	const [initialRegion, setInitialRegion] = useState({
		latitude: origin.latitude,
		longitude: origin.longitude,
		latitudeDelta: 0.1,
		longitudeDelta: 0.1,
	});
	const geocodeAddress = async (address) => {
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json`,
				{
					params: {
						address: address,
						region: 'BO', // Restringe la búsqueda a Bolivia
						key: GOOGLE_MAPS_KEY,
						bounds: '-17.50,-66.30|-17.20,-65.80',
					},
				}
			);

			if (response.data.status === 'OK' && response.data.results.length > 0) {
				const location = response.data.results[0].geometry.location;
				console.log('Geocoded location:', location);
				setmyDestination({
					latitude:location['lat'],
					longitude:location['lng']
				})
				return location; // { latitude, longitude }
			} else {
				console.warn('No results found for the address');
				return null;
			}
		} catch (error) {
			console.error('Error fetching geocoding data:', error);
			return null;
		}
	};
	useEffect(() => {
		if (addressTest.length > 0) {
			geocodeAddress(addressTest);
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
					coordinate={myDestination}
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
					destination={myDestination}
					apikey={GOOGLE_MAPS_KEY}
					strokeColor='#9C7CFE'
					strokeWidth={6}
					onError={(errorMessage) => console.warn('Directions error:', errorMessage)}
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
