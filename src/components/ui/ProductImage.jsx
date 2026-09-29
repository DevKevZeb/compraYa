import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, radius as radii } from '../../theme';

// Product photo shown whole ("contain") on a white tile, with a fade-in and an
// icon when no image is available.
export const ProductImage = ({
  uri,
  height = 140,
  radius = radii.md,
  style,
  accessibilityLabel,
}) => (
  <View style={[styles.tile, { height, borderRadius: radius }, style]}>
    {uri ? (
      <Image
        source={{ uri }}
        style={styles.image}
        contentFit="contain"
        transition={200}
        accessibilityLabel={accessibilityLabel}
      />
    ) : (
      <MaterialCommunityIcons name="image-off-outline" size={32} color={colors.textSubtle} />
    )}
  </View>
);

const styles = StyleSheet.create({
  tile: {
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
