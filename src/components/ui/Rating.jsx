import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, spacing } from '../../theme';
import { popularityToRating } from '../../utils/product';

// Compact star rating, e.g. "★ 4.8". Popularity (0-100) maps to a 0-5 rating.
export const Rating = ({ popularity, size = 14, showMax = false }) => (
  <View style={styles.row} accessibilityLabel={`Rated ${popularityToRating(popularity)} out of 5`}>
    <MaterialCommunityIcons name="star" size={size} color={colors.star} />
    <Text variant="labelMedium" style={styles.value}>
      {popularityToRating(popularity).toFixed(1)}
      {showMax ? (
        <Text variant="labelMedium" style={styles.max}>
          {' '}
          / 5
        </Text>
      ) : null}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xxs,
  },
  value: {
    color: colors.text,
  },
  max: {
    color: colors.textSubtle,
  },
});
