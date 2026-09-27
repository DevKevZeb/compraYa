import { ScrollView } from 'react-native';
import { Chip } from 'react-native-paper';
import { styles } from '../styles/global';

// Category filter; a null selection means "all products".
export const CategoryChips = ({ categories, selectedId, onSelect }) => {
  const options = [{ categoria_id: null, nombre_categoria: 'Todos' }, ...categories];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollView}>
      {options.map((category) => {
        const selected = selectedId === category.categoria_id;
        return (
          <Chip
            key={category.categoria_id ?? 'all'}
            icon={selected ? 'check' : undefined}
            selected={selected}
            onPress={() => onSelect(category.categoria_id)}
            style={[styles.chip, selected && styles.selectedChip]}
          >
            {category.nombre_categoria}
          </Chip>
        );
      })}
    </ScrollView>
  );
};
