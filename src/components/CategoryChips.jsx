import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';

const CATEGORY_ICONS = {
  Electronics: 'laptop',
  Home: 'sofa-outline',
  Fashion: 'tshirt-crew-outline',
  Beauty: 'lipstick',
  Sports: 'basketball',
  Accessories: 'watch-variant',
};

// Horizontal category filter; a null selection means "all products".
export const CategoryChips = ({ categories, selectedId, onSelect }) => {
  const options = [{ categoria_id: null, nombre_categoria: 'All' }, ...categories];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((category) => {
        const selected = selectedId === category.categoria_id;
        const icon = CATEGORY_ICONS[category.nombre_categoria] ?? 'view-grid-outline';
        return (
          <Pressable
            key={category.categoria_id ?? 'all'}
            onPress={() => onSelect(category.categoria_id)}
            style={[styles.chip, selected && styles.chipSelected]}
            accessibilityRole="button"
            accessibilityState={{ selected }}
          >
            <MaterialCommunityIcons
              name={icon}
              size={18}
              color={selected ? colors.onPrimary : colors.primary}
            />
            <Text variant="labelLarge" style={[styles.label, selected && styles.labelSelected]}>
              {category.nombre_categoria}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md + 2,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: {
    color: colors.text,
  },
  labelSelected: {
    color: colors.onPrimary,
  },
});
