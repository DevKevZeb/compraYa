import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { colors, radius as radii } from '../../theme';

// Pulsing placeholder shown while content loads.
export const Skeleton = ({ width = '100%', height = 16, radius = radii.sm, style }) => {
  const [opacity] = useState(() => new Animated.Value(0.5));

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: false }),
        Animated.timing(opacity, { toValue: 0.5, duration: 700, useNativeDriver: false }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[styles.base, { width, height, borderRadius: radius, opacity }, style]}
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surfaceMuted,
  },
});
