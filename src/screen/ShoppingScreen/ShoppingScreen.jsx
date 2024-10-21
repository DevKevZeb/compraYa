import * as React from 'react';
import { View } from 'react-native';
import { ListCardComponent } from '../../components/listCard.component';
import { useDialog } from '../../Stores/global.store';
import { TrashComponent } from '../../components/trash.component';

export const ShoppingScreen = () => {
	const isVisible = useDialog((state) => state.isVisible);
	const hideDialog = useDialog((state) => state.hideDialog);
	return (
		<View style={{ padding: 15 }}>
			<ListCardComponent />
			{isVisible && <TrashComponent isVisible={isVisible} hideDialog={hideDialog}/>}
		</View>
	);
};
