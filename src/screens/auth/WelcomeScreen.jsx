import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { BrandMark } from '../../components/ui/BrandMark';
import { DEMO_ACCOUNT, signInAsGuest } from '../../services/auth';
import { colors, radius, shadows, spacing } from '../../theme';

const FEATURES = [
  { icon: 'truck-fast-outline', label: 'Fast delivery' },
  { icon: 'shield-check-outline', label: 'Secure payments' },
  { icon: 'map-marker-path', label: 'Live tracking' },
];

// Decorative product bubbles floating over the hero.
const BUBBLES = [
  { icon: 'headphones', top: '34%', left: '7%', size: 58 },
  { icon: 'watch-variant', top: '24%', right: '10%', size: 50 },
  { icon: 'shoe-sneaker', bottom: '14%', left: '14%', size: 52 },
  { icon: 'lipstick', bottom: '20%', right: '12%', size: 46 },
];

export const WelcomeScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const [guestLoading, setGuestLoading] = useState(false);

  const handleGuest = async () => {
    setGuestLoading(true);
    const { error } = await signInAsGuest();
    setGuestLoading(false);

    // On success the root navigator switches to the main app.
    if (error) {
      Toast.show({ type: 'error', text1: 'Could not sign in as guest', text2: error.message });
    }
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + spacing.xl }]}
      bounces={false}
    >
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + spacing.xl }]}
      >
        <BrandMark size={44} light />
        {BUBBLES.map(({ icon, size, ...position }) => (
          <View
            key={icon}
            style={[styles.bubble, position, { width: size, height: size, borderRadius: size / 2 }]}
          >
            <MaterialCommunityIcons name={icon} size={size * 0.5} color={colors.primary} />
          </View>
        ))}
        <View style={styles.heroCenter}>
          <MaterialCommunityIcons name="shopping-outline" size={96} color={colors.onPrimary} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <Text variant="headlineMedium" style={styles.title}>
          Everything you love, delivered fast.
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Browse the catalog, pay by card or QR and follow your order on the map.
        </Text>

        <View style={styles.features}>
          {FEATURES.map(({ icon, label }) => (
            <View key={label} style={styles.feature}>
              <View style={styles.featureIcon}>
                <MaterialCommunityIcons name={icon} size={22} color={colors.primary} />
              </View>
              <Text variant="labelMedium" style={styles.featureLabel}>
                {label}
              </Text>
            </View>
          ))}
        </View>

        <Button
          mode="contained"
          onPress={() => navigation.navigate('SignIn')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Sign in
        </Button>
        <Button
          mode="outlined"
          onPress={() => navigation.navigate('Register')}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Create account
        </Button>

        {DEMO_ACCOUNT && (
          <View style={styles.guest}>
            <Button
              mode="text"
              icon="account-arrow-right-outline"
              onPress={handleGuest}
              loading={guestLoading}
              disabled={guestLoading}
            >
              Continue as guest
            </Button>
            <Text variant="bodySmall" style={styles.guestHint}>
              Explore with a shared demo account
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  content: {
    flexGrow: 1,
  },
  hero: {
    height: 340,
    paddingHorizontal: spacing.xxl,
    borderBottomLeftRadius: radius.xl * 1.5,
    borderBottomRightRadius: radius.xl * 1.5,
    overflow: 'hidden',
  },
  heroCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.95,
  },
  bubble: {
    position: 'absolute',
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  body: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.xxl,
  },
  title: {
    color: colors.text,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: spacing.xxl,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
    gap: spacing.xs,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureLabel: {
    color: colors.textMuted,
    textAlign: 'center',
  },
  button: {
    borderRadius: radius.pill,
    marginBottom: spacing.md,
  },
  buttonContent: {
    height: 50,
  },
  guest: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  guestHint: {
    color: colors.textSubtle,
  },
});
