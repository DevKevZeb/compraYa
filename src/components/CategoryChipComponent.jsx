import { useState } from 'react';
import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { useCategory } from '../Stores/StoreBadge';
import { styles } from '../styles/globalStyle';

export const CategoryChipComponent = ({filterCategory}) => {
	const [selectedChip, setSelectedChip] = useState(null);
	const { categorys } = useCategory();

<<<<<<< HEAD
	const handleChipPress = (id) => {
		setSelectedChip(id);
	};
	return (
		<ScrollView
			horizontal={true}
			showsHorizontalScrollIndicator={false}
			style={styles.scrollView}
		>
				<Chip //agregar categoria Todos
					icon='check'
					selected={selectedChip === null}
					onPress={() => {
						handleChipPress(null),
						filterCategory('Todos');
					}} // Cambia el estado al hacer clic
					style={[
						styles.chip,
						selectedChip === null && styles.selectedChip, // Aplica estilos condicionales
					]}
				>
					{'Todos'}
				</Chip>
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
=======
	const handleChipPress = (id, nombre_categoria) => {
        setSelectedChip(id);
        filterCategory(nombre_categoria);
    };

    return (
        <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}
        >
			 <Chip
                icon='check'
                selected={selectedChip === 'todos'}
                onPress={() => handleChipPress('todos', 'Todos')}
                style={[
                    styles.chip,
                    selectedChip === 'todos' && styles.selectedChip,
                ]}
                key='todos'
            >
                Todos
			</Chip>
            {categorys.map((category) => (
                <Chip
                    icon='check'
                    selected={selectedChip === category.categoria_id}
                    onPress={() => handleChipPress(category.categoria_id, category.nombre_categoria)}
                    style={[
                        styles.chip,
                        selectedChip === category.categoria_id && styles.selectedChip,
                    ]}
                    key={category.categoria_id}
                >
                    {category.nombre_categoria}
                </Chip>
            ))}
        </ScrollView>
    );
};
>>>>>>> master
