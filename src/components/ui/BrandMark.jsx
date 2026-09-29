import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { colors, fontFamilies, radius } from '../../theme';

// On colored backgrounds the badge turns translucent white.
const LIGHT_BADGE = ['rgba(255, 255, 255, 0.32)', 'rgba(255, 255, 255, 0.14)'];

// App logo: gradient badge with a cart and the "CompraYa" wordmark.
export const BrandMark = ({ size = 64, showName = true, light = false, style }) => (
  <View style={[styles.row, style]} accessibilityRole="image" accessibilityLabel="CompraYa">
    <LinearGradient
      colors={light ? LIGHT_BADGE : [colors.primaryLight, colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.badge, { width: size, height: size, borderRadius: size * 0.3 }]}
    >
      <MaterialCommunityIcons name="cart-variant" size={size * 0.55} color={colors.onPrimary} />
    </LinearGradient>
    {showName ? (
      <Text
        style={[
          styles.name,
          { fontSize: size * 0.45, color: light ? colors.onPrimary : colors.text },
        ]}
      >
        Compra
        <Text
          style={[
            styles.name,
            { fontSize: size * 0.45, color: light ? '#DCD0FF' : colors.primaryLight },
          ]}
        >
          Ya
        </Text>
      </Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.lg,
  },
  name: {
    fontFamily: fontFamilies.bold,
    letterSpacing: -0.5,
  },
});
