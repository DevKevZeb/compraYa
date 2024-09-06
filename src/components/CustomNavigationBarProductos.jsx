import { Appbar } from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../styles/globalStyle';
export const CustomNavigationBarProducts = ({ navigation, options, back}) => {
	const title= getHeaderTitle(options);
	
	return (
		<Appbar.Header style={styles.appBar} >
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={title} />
			{!back ? (
				<Appbar.Action
					icon={() => <Feather name='shopping-cart' size={24} color='black' />}
					onPress={() => {
						navigation.navigate('Carrito');
					}}
				/>
			) : null}
		</Appbar.Header>
	);
};
