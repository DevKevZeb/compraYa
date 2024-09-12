import { View } from 'react-native';
import { getHeaderTitle } from '@react-navigation/elements';
import { Appbar, Badge } from 'react-native-paper';
import Feather from '@expo/vector-icons/Feather';
import { styles } from '../styles/globalStyle';
import { useBadgeStore } from '../Stores/global.store';
export const CustomNavigationBarProducts = ({ navigation, options, back,nextRoute }) => {
	const badge = useBadgeStore((state) => state.badge);
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
					{badge > 0 ? <Badge style={styles.badge}>{badge}</Badge> : null}
				</View>
			) : (
				<Appbar.Action
					icon={() => <Feather name='trash-2' size={24} color='black' />}
					onPress={() => {
						navigation.navigate(nextRoute);
					}}
				/>
			)}
		</Appbar.Header>
	);
};
