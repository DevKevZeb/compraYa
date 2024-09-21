import {useState} from 'react';
import { View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { useProduct } from '../Stores/global.store';

export const ListCardComponent = () => {
	const productSelected = useProduct((state) => state.productSelected);
	const [productState, setfirst] = useState([productSelected]);
    const changeCant = ()=>{

    }
	return (
		<View style={{ marginBottom: 10 }}>
			{productSelected.map((element) => (
				<Card key={element.producto_id} style={{ marginBottom: 10 }}>
					<Card.Title
						title={element.nombre_producto}
						subtitle={`Precio:${element.precio}`}
						style={{ paddingTop: 20 }}
						titleVariant='titleLarge'
					/>
					<Card.Actions>
						<Button
							icon='plus'
							mode='contained'
							labelStyle={{ marginLeft: 10 }}
                            onPress={changeCant}
						></Button>
						<Text variant='headlineSmall'>{element.cantidad}</Text>
						<Button
							icon='minus'
							mode='contained'
							labelStyle={{ marginLeft: 10 }}
						></Button>
					</Card.Actions>
				</Card>
			))}
		</View>
	);
};
