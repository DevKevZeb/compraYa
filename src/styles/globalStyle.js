import { StatusBar, StyleSheet } from 'react-native';

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
		backgroundColor: '#9C7CFE',
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
	selectedChip:{
		backgroundColor:'#BEA8FF'
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
	},

	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	  },
	toastContainer: {
		height: 60,
		width: '90%',
		backgroundColor: '#fff', // Fondo blanco para el mensaje de error
		borderRadius: 10,
		padding: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#800080', // Borde morado
		borderWidth: 3,
	},
	toastText1: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#000', // Texto negro
	},
		toastText2: {
		fontSize: 14,
		color: '#000', // Texto negro
		},

});
