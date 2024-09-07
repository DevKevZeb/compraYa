import React from 'react';
import { Image } from 'react-native';
import { Dialog, Portal, Text, Button } from 'react-native-paper';

export const DialogComponent = ({ visible, hideDialog,title}) => {
	return (
		<Portal>
			<Dialog visible={visible} theme={{ colors: { background: '#BEA8FF' } }}>
				<Dialog.Title>{title}</Dialog.Title>
				<Dialog.Content>
					<Image
						source={{ uri: 'https://picsum.photos/700' }}
						style={{
							width: '100%',
							height: 150,
							alignSelf: 'center',
							marginBottom: 10,
						}}
					/>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                    <Text variant="bodyMedium">This is simple dialog</Text>
                    <Text variant="bodyMedium">This is simple dialog</Text>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={hideDialog}>Cancel</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};
