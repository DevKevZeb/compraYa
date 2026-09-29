import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, radius, spacing } from '../theme';

const BANNER_WIDTH = 300;

// Editorial banners that jump to a category.
const BANNERS = [
  {
    category: 'Electronics',
    eyebrow: 'New arrivals',
    title: 'Tech that keeps up with you',
    icon: 'cellphone',
    gradient: ['#6C4CE0', '#9C7CFE'],
  },
  {
    category: 'Beauty',
    eyebrow: 'Self-care week',
    title: 'Skin care & fragrances',
    icon: 'spa-outline',
    gradient: ['#D6456E', '#F28BAA'],
  },
  {
    category: 'Sports',
    eyebrow: 'Get moving',
    title: 'Gear for every game',
    icon: 'basketball',
    gradient: ['#0E8A74', '#3CC4A5'],
  },
];

export const PromoBanners = ({ categories, onSelectCategory }) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    snapToInterval={BANNER_WIDTH + spacing.md}
    decelerationRate="fast"
    contentContainerStyle={styles.row}
  >
    {BANNERS.map((banner) => {
      const category = categories.find((c) => c.nombre_categoria === banner.category);
      return (
        <Pressable
          key={banner.category}
          onPress={() => category && onSelectCategory(category.categoria_id)}
          accessibilityRole="button"
          accessibilityLabel={`${banner.title}. Shop ${banner.category}`}
        >
          <LinearGradient
            colors={banner.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.text}>
              <Text variant="labelMedium" style={styles.eyebrow}>
                {banner.eyebrow.toUpperCase()}
              </Text>
              <Text variant="titleLarge" style={styles.title}>
                {banner.title}
              </Text>
              <View style={styles.cta}>
                <Text variant="labelLarge" style={styles.ctaText}>
                  Shop now
                </Text>
                <MaterialCommunityIcons name="arrow-right" size={16} color={colors.text} />
              </View>
            </View>
            <MaterialCommunityIcons
              name={banner.icon}
              size={84}
              color="rgba(255, 255, 255, 0.35)"
              style={styles.icon}
            />
          </LinearGradient>
        </Pressable>
      );
    })}
  </ScrollView>
);

const styles = StyleSheet.create({
  row: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  banner: {
    width: BANNER_WIDTH,
    height: 150,
    borderRadius: radius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  text: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 1,
  },
  eyebrow: {
    color: 'rgba(255, 255, 255, 0.85)',
    letterSpacing: 1,
  },
  title: {
    color: colors.onPrimary,
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
  },
  ctaText: {
    color: colors.text,
  },
  icon: {
    position: 'absolute',
    right: -6,
    bottom: -8,
  },
});
