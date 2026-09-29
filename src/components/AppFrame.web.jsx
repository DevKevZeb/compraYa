import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { DEMO_ACCOUNT, signInAsGuest } from '../services/auth';
import { useUserStore } from '../stores/user.store';
import { colors, fontFamilies, radius, spacing } from '../theme';
import { BrandMark } from './ui/BrandMark';

// Phone-sized viewport (plus a 10px bezel) used on wide screens.
const PHONE = { width: 432, height: 900 };
// Below this width the browser is already phone-sized, so the app fills it.
const FRAME_BREAKPOINT = 600;
// From this width there is room for the product showcase next to the phone.
const SHOWCASE_BREAKPOINT = 1100;
const MARGIN = 24;

const FEATURES = [
  {
    icon: 'shield-lock-outline',
    text: 'Postgres row level security and a transactional order RPC',
  },
  {
    icon: 'credit-card-check-outline',
    text: 'On-device card validation, QR payments and saved cards',
  },
  { icon: 'map-marker-path', text: 'Delivery tracking with OpenStreetMap and OSRM routing' },
  { icon: 'heart-outline', text: 'Favorites, order history and a status timeline' },
];

const STACK = ['Expo SDK 57', 'React Native', 'Supabase', 'Zustand', 'React Navigation', 'Jest'];

const Showcase = () => {
  const signedIn = useUserStore((state) => Boolean(state.session));
  const [loading, setLoading] = useState(false);

  const tryIt = async () => {
    setLoading(true);
    await signInAsGuest();
    setLoading(false);
  };

  return (
    <View style={styles.showcase}>
      <BrandMark size={48} light />
      <Text style={styles.headline}>A full-stack mobile shopping app.</Text>
      <Text variant="bodyLarge" style={styles.lead}>
        Browse, pay by card or QR and track deliveries on a live map. Built with Expo and Supabase,
        running here as a web build of the same codebase.
      </Text>

      <View style={styles.features}>
        {FEATURES.map((feature) => (
          <View key={feature.text} style={styles.feature}>
            <View style={styles.featureIcon}>
              <MaterialCommunityIcons name={feature.icon} size={18} color={colors.onPrimary} />
            </View>
            <Text variant="bodyMedium" style={styles.featureText}>
              {feature.text}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.stack}>
        {STACK.map((item) => (
          <View key={item} style={styles.chip}>
            <Text variant="labelMedium" style={styles.chipText}>
              {item}
            </Text>
          </View>
        ))}
      </View>

      {DEMO_ACCOUNT && !signedIn ? (
        <Button
          mode="contained"
          icon="account-arrow-right-outline"
          onPress={tryIt}
          loading={loading}
          disabled={loading}
          buttonColor={colors.surface}
          textColor={colors.primary}
          style={styles.cta}
          contentStyle={styles.ctaContent}
        >
          Try it as a guest
        </Button>
      ) : null}
    </View>
  );
};

// The app is designed for phones: on desktop browsers show it inside a centered
// phone frame instead of stretching the layout across the whole window.
export const AppFrame = ({ children }) => {
  const { width, height } = useWindowDimensions();

  if (width < FRAME_BREAKPOINT) {
    return <View style={styles.fullScreen}>{children}</View>;
  }

  const frameHeight = Math.min(PHONE.height, height - MARGIN * 2);

  return (
    <View style={styles.backdrop}>
      {width >= SHOWCASE_BREAKPOINT ? <Showcase /> : null}
      <View style={[styles.phone, { height: frameHeight }]}>
        <View style={styles.screen}>{children}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  backdrop: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 96,
    backgroundColor: '#1E1B2E',
    backgroundImage: 'radial-gradient(circle at 30% 30%, #3D2A80 0%, #1E1B2E 70%)',
  },
  phone: {
    width: PHONE.width,
    padding: 10,
    borderRadius: 44,
    backgroundColor: '#0F0D18',
    boxShadow: '0 30px 80px rgba(0, 0, 0, 0.55)',
  },
  // Rounded screen inside the bezel, so corners never clip the app's edges.
  screen: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 34,
    backgroundColor: colors.surface,
  },
  showcase: {
    maxWidth: 460,
    flexShrink: 1,
  },
  headline: {
    color: colors.onPrimary,
    fontFamily: fontFamilies.bold,
    fontSize: 44,
    lineHeight: 52,
    letterSpacing: -1,
    marginTop: spacing.xxl,
  },
  lead: {
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: spacing.lg,
    lineHeight: 26,
  },
  features: {
    marginTop: spacing.xxl,
    gap: spacing.md,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: radius.md,
    backgroundColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureText: {
    flex: 1,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  stack: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  chipText: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  cta: {
    alignSelf: 'flex-start',
    marginTop: spacing.xxl,
    borderRadius: radius.pill,
  },
  ctaContent: {
    height: 50,
    paddingHorizontal: spacing.md,
  },
});
