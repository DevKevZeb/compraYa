import { StyleSheet, StatusBar } from 'react-native';

export const styles = StyleSheet.create({
	text: {
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		alignItems: 'center',
	},
	appBar: {
		backgroundColor: '#BEA8FF',
	},
	searchBar: {
		marginTop: 10,
	},
	scrollView: {
		padding: 10,
	},
	chip: {
		marginRight: 5,
	},
	scrollCard: {
		marginTop: 5,
		padding: 10,
		marginBottom: 250,
	},
	containerSafe: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	card: {
		marginBottom: 20,
	},
	cardTitle: {
		fontWeight: 'black',
	},
	iconWithBadge: {
		position: 'relative',
	},
	badge: {
		position: 'absolute',
		top: 0,
		right: 0,
	},
	loadingContainer: {
		position:'absolute',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom:"10%"
	},
	coverContainer:{
		position: 'relative',
	}
});
