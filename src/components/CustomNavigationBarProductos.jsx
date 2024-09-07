import { View } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar,Badge } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../styles/globalStyle';
import { useBadgeStore } from '../context/store';
export const CustomNavigationBarProducts = ({ navigation, options, back }) => {
	const {badge} = useBadgeStore();
	const title = getHeaderTitle(options);

	return (
		<Appbar.Header style={styles.appBar}>
			{back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
			<Appbar.Content title={title} />
			{!back ? (
				<View style={styles.iconWithBadge}>
					<Appbar.Action
						icon={() => (
							<Feather name='shopping-cart' size={24} color='black' />
						)}
						onPress={() => {
							navigation.navigate('Carrito');
						}}
					/>
					<Badge style={styles.badge}>{badge}</Badge>
				</View>
			) : (
				<Appbar.Action
					icon={() => <Feather name='trash-2' size={24} color='black' />}
					onPress={() => {
						navigation.navigate('Carrito');
					}}
				/>
			)}
		</Appbar.Header>
	);
};
