import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from 'react';
import { Animated, Easing, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, shadows, spacing } from '../../theme';
import { successFeedback } from '../../utils/haptics';
import { formatCurrency } from '../../utils/order';

export const OrderSuccessScreen = ({ navigation, route }) => {
  const { order } = route.params;
  const insets = useSafeAreaInsets();
  const [scale] = useState(() => new Animated.Value(0));
  const [ring] = useState(() => new Animated.Value(0));
  const [content] = useState(() => new Animated.Value(0));

  useEffect(() => {
    successFeedback();
    Animated.sequence([
      Animated.spring(scale, { toValue: 1, friction: 5, tension: 80, useNativeDriver: false }),
      Animated.parallel([
        Animated.timing(ring, {
          toValue: 1,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(content, { toValue: 1, duration: 400, useNativeDriver: false }),
      ]),
    ]).start();
  }, [scale, ring, content]);

  const ringStyle = {
    opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0] }),
    transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] }) }],
  };
  const contentStyle = {
    opacity: content,
    transform: [{ translateY: content.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }],
  };

  const keepShopping = () => {
    navigation.popToTop();
    navigation.navigate('HomeTab');
  };

  return (
    <View style={[styles.screen, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.center}>
        <View style={styles.badgeWrap}>
          <Animated.View style={[styles.ring, ringStyle]} />
          <Animated.View style={[styles.badge, { transform: [{ scale }] }]}>
            <MaterialCommunityIcons name="check-bold" size={56} color={colors.onPrimary} />
          </Animated.View>
        </View>

        <Animated.View style={[styles.text, contentStyle]}>
          <Text variant="headlineSmall" style={styles.title}>
            Order confirmed!
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Thanks for your purchase. We are preparing your order and will send it your way shortly.
          </Text>

          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="bodyMedium" style={styles.muted}>
                Order number
              </Text>
              <Text variant="titleSmall" style={styles.value}>
                {order.numero_seguimiento}
              </Text>
            </View>
            <View style={styles.row}>
              <Text variant="bodyMedium" style={styles.muted}>
                Total paid
              </Text>
              <Text variant="titleSmall" style={styles.value}>
                {formatCurrency(order.monto_total)}
              </Text>
            </View>
            <View style={styles.row}>
              <Text variant="bodyMedium" style={styles.muted}>
                Estimated delivery
              </Text>
              <Text variant="titleSmall" style={styles.value}>
                30–45 min
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <Animated.View style={[styles.actions, contentStyle]}>
        <Button
          mode="contained"
          icon="map-marker-path"
          onPress={() =>
            navigation.replace('DeliveryMap', {
              direccion_envio: order.direccion_envio,
              order,
            })
          }
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Track order
        </Button>
        <Button
          mode="outlined"
          onPress={keepShopping}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Continue shopping
        </Button>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.xxl,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeWrap: {
    width: 120,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxl,
  },
  ring: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
  },
  badge: {
    width: 110,
    height: 110,
    borderRadius: radius.pill,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.raised,
  },
  text: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  card: {
    alignSelf: 'stretch',
    marginTop: spacing.xxl,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    gap: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  muted: {
    color: colors.textMuted,
  },
  value: {
    color: colors.text,
  },
  actions: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  button: {
    borderRadius: radius.pill,
  },
  buttonContent: {
    height: 50,
  },
});
