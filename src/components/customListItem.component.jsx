import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';

export const CustomListItemComponent = ({ title, children }) => {
	return (
		<List.Item
			title={title}
			style={styles.listItem}
			right={() => children} // Renderiza los children en el lado derecho
		/>
	);
};

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		backgroundColor: '#EADDFF',

		borderRadius: 15,
		marginTop: 8,
	},
});
