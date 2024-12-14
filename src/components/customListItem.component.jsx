import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { List } from 'react-native-paper';


export const CustomListItemComponent = ({  children }) => {
	
	return (
		<List.Item
			style={styles.listItem}
			left={() => children}// Renderiza los children en el lado izquierdo
			
		/>
	);
};

const styles = StyleSheet.create({
	listItem: {
		width: '100%',
		backgroundColor: '#EADDFF',
		borderRadius: 15,
		marginTop: 8,
		paddingLeft:10
	},
	
});
