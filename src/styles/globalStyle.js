import { StyleSheet ,StatusBar} from 'react-native';

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
		backgroundColor: '#EADDFF',
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
	scrollCard:{
		marginTop:5,
		padding:10,
	},
	containerSafe: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
});
