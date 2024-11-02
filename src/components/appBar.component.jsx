import React from 'react';
import { Appbar } from 'react-native-paper';
import { styles } from '../styles/globalStyle';
import { getHeaderTitle } from '@react-navigation/elements';

export const AppBarComponent = ({ navigation, back, options,route }) => {
	const { goBack, navigate } = navigation;
	const title = getHeaderTitle(options,route.name);
	console.log(title);

	return (
		<Appbar.Header style={styles.appBar}>
			{back ? <Appbar.BackAction onPress={goBack} /> : null}
			<Appbar.Content title={title} />
		</Appbar.Header>
	);
};
