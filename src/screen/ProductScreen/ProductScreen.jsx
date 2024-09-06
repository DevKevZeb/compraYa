import * as React from 'react';
import { View, FlatList, ScrollView, Text } from 'react-native';
import { Searchbar, Chip, Card, IconButton,Button } from 'react-native-paper';
import { styles } from '../../styles/globalStyle';
import { nameProducts } from '../../assets/data/nameProductos';
export const ProductScreen = () => {
	const categorys = [
		'ropa',
		'juguetes',
		'construccion',
		'cosmeticos',
		'limpieza',
	];
	const [searchQuery, setSearchQuery] = React.useState('');
	const item = ({ item }) => {
		return (
			<Card style={{ margin: 5 }}>
				<Card.Title
					title={item.nombre}
					titleNumberOfLines={2}
					left={(props) => (
						<IconButton {...props} icon='image' style={{ marginLeft: 0 }} />
					)}
					// right={(props) => (
					// 	<IconButton {...props} icon='dots-vertical' onPress={() => {}} />
					// )}
				/>
			</Card>
		);
	};
	const ListFooter = () => {
		return <Text></Text>;
	};
	return (
		<View>
			<View style={styles.searchBar}>
				<Searchbar
					placeholder='busca un producto'
					onChangeText={setSearchQuery}
					value={searchQuery}
				/>
			</View>
			<View style={styles.filterChip}>
				<ScrollView
					horizontal={true}
					showsHorizontalScrollIndicator={false}
					style={styles.scrollView}
				>
					{categorys.map((category) => (
						<Chip
							icon='check'
							onPress={() => console.log('Pressed')}
							style={styles.chip}
						>
							{category}
						</Chip>
					))}
				</ScrollView>
			</View>
			{/* <View>
				
					<FlatList
						data={nameProducts}
						renderItem={item}
						KeyExtractor={(item) => item.id}
						
					/>
			</View> */}
			<Card style={styles.scrollCard}>
				<Card.Title
					title='Card Title'
				/>
				<Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
				
				<Card.Actions>
					<Button>Cancel</Button>
					<Button>Ok</Button>
				</Card.Actions>
			</Card>
		</View>
	);
};
