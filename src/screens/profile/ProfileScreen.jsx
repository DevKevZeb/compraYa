import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import appConfig from '../../../app.json';
import { MenuItem } from '../../components/MenuItem';
import Toast from 'react-native-toast-message';
import { StatusChip } from '../../components/ui';
import { supabase } from '../../lib/supabase';
import { isDemoAccount } from '../../services/auth';
import { useFavoritesStore } from '../../stores/favorites.store';
import { useUserStore } from '../../stores/user.store';
import { colors, radius, shadows, spacing } from '../../theme';
import { formatCompactCurrency } from '../../utils/order';
import { getInitials } from '../../utils/user';

const Stat = ({ value, label }) => (
  <View style={styles.stat}>
    <Text variant="titleLarge" style={styles.statValue}>
      {value}
    </Text>
    <Text variant="labelMedium" style={styles.statLabel}>
      {label}
    </Text>
  </View>
);

const showDemoNotice = () =>
  Toast.show({
    type: 'info',
    text1: 'This is the shared demo account',
    text2: 'Create your own account to edit your details.',
  });

export const ProfileScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const user = useUserStore((state) => state.user);
  const orders = useUserStore((state) => state.orders);
  const orderHistory = useUserStore((state) => state.orderHistory);
  const fetchUserOrders = useUserStore((state) => state.fetchUserOrders);
  const fetchOrderHistory = useUserStore((state) => state.fetchOrderHistory);
  const favoritesCount = useFavoritesStore((state) => state.products.length);
  const userId = user?.userId;

  // Orders are placed from the cart tab, so refresh whenever this tab is shown.
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserOrders();
        fetchOrderHistory();
      }
    }, [userId, fetchUserOrders, fetchOrderHistory])
  );

  if (!user) {
    return <View style={styles.screen} />;
  }

  const demo = isDemoAccount(user.email);
  const allOrders = [...orders, ...orderHistory];
  const spent = allOrders
    .filter((order) => order.estado !== 'cancelado')
    .reduce((sum, order) => sum + Number(order.monto_total), 0);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + spacing.xl }]}
      >
        <Avatar.Text
          size={76}
          label={getInitials(user.nombre_usuario)}
          style={styles.avatar}
          color={colors.primary}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {user.nombre_usuario || 'CompraYa customer'}
        </Text>
        <Text variant="bodyMedium" style={styles.email}>
          {user.email}
        </Text>
        {demo ? <StatusChip label="Demo account" tone="neutral" style={styles.demoChip} /> : null}
      </LinearGradient>

      <View style={styles.stats}>
        <Stat value={allOrders.length} label="Orders" />
        <View style={styles.statDivider} />
        <Stat value={orderHistory.length} label="Delivered" />
        <View style={styles.statDivider} />
        <Stat value={formatCompactCurrency(spent)} label="Spent" />
      </View>

      <Text variant="labelLarge" style={styles.groupLabel}>
        SHOPPING
      </Text>
      <View style={styles.group}>
        <MenuItem
          icon="package-variant-closed"
          label="My orders"
          description="Track, review and confirm deliveries"
          badge={orders.length || undefined}
          onPress={() => navigation.navigate('Orders')}
        />
        <MenuItem
          icon="heart-outline"
          label="Favorites"
          description={`${favoritesCount} saved ${favoritesCount === 1 ? 'product' : 'products'}`}
          onPress={() => navigation.navigate('FavoritesTab')}
        />
        <MenuItem
          icon="credit-card-outline"
          label="Payment methods"
          description="Manage your saved cards"
          onPress={() => navigation.navigate('PaymentMethods')}
          last
        />
      </View>

      <Text variant="labelLarge" style={styles.groupLabel}>
        ACCOUNT
      </Text>
      <View style={styles.group}>
        {/* The shared demo account stays read-only so every visitor sees the same profile. */}
        <MenuItem
          icon="account-edit-outline"
          label="Edit profile"
          description={demo ? 'Create your own account to edit your details' : 'Name and email'}
          onPress={demo ? showDemoNotice : () => navigation.navigate('EditProfile')}
        />
        <MenuItem
          icon="logout"
          label="Sign out"
          danger
          last
          onPress={() => supabase.auth.signOut()}
        />
      </View>

      <Text variant="bodySmall" style={styles.version}>
        CompraYa · v{appConfig.expo.version}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingBottom: spacing.xxxl,
  },
  hero: {
    alignItems: 'center',
    paddingBottom: spacing.xxxl + spacing.xl,
    borderBottomLeftRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },
  avatar: {
    backgroundColor: colors.surface,
  },
  name: {
    color: colors.onPrimary,
    marginTop: spacing.md,
  },
  email: {
    color: 'rgba(255, 255, 255, 0.85)',
  },
  demoChip: {
    alignSelf: 'center',
    marginTop: spacing.sm,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginTop: -spacing.xxxl,
    paddingVertical: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    ...shadows.raised,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    color: colors.text,
  },
  statLabel: {
    color: colors.textMuted,
    marginTop: spacing.xxs,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    alignSelf: 'stretch',
    backgroundColor: colors.border,
  },
  groupLabel: {
    color: colors.textSubtle,
    letterSpacing: 1,
    marginHorizontal: spacing.xl,
    marginTop: spacing.xxl,
    marginBottom: spacing.sm,
  },
  group: {
    marginHorizontal: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    overflow: 'hidden',
    ...shadows.card,
  },
  version: {
    color: colors.textSubtle,
    textAlign: 'center',
    marginTop: spacing.xxl,
  },
});
