import React from 'react';
import { View } from 'react-native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
export const LoadingImageComponent = () => {
	return (
		<View style={styles.loadingContainer}>
			<ActivityIndicator animating={true} color={MD2Colors.deepPurple400} />
		</View>
	);
};
