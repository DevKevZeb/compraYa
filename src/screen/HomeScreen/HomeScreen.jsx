import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { styles } from '../../styles/globalStyle';


export const HomeScreen = () => {
  
	return (
		<View>
			<Appbar.Header>
				<Appbar.Content title='Home' style={styles.title} />
			</Appbar.Header>
		</View>
	);
};
