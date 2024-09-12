import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useCategory } from '../Stores/global.store';
import { styles } from '../styles/globalStyle';
export const CategoryChipComponent = ({ filterCategory }) => {
	const [selectedChip, setSelectedChip] = useState(null);
	const categorys = useCategory((state) => state.categorys);

	const handleChipPress = (id) => {
		setSelectedChip(id);
	};
	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			style={styles.scrollView}
		>
			{categorys.map((category) => (
				<Chip
					icon='check'
					selected={selectedChip === category.categoria_id}
					onPress={() => {
						handleChipPress(category.categoria_id),
							filterCategory(category.nombre_categoria);
					}} // Cambia el estado al hacer clic
					style={[
						styles.chip,
						selectedChip === category.categoria_id && styles.selectedChip, // Aplica estilos condicionales
					]}
					key={category.categoria_id}
				>
					{category.nombre_categoria}
				</Chip>
			))}
		</ScrollView>
	);
};
