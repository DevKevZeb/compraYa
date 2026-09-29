import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useCartStore } from '../stores/cart.store';
import { useFavoritesStore } from '../stores/favorites.store';
import { useUserStore } from '../stores/user.store';
import { colors, fontFamilies, shadows } from '../theme';
import { CartNavigator } from './CartNavigator';
import { FavoritesNavigator } from './FavoritesNavigator';
import { HomeNavigator } from './HomeNavigator';
import { ProfileNavigator } from './ProfileNavigator';

const Tab = createBottomTabNavigator();

// On the web the default tab bar height clips the labels; native keeps the
// automatic height so it respects the device's safe area.
const tabBarStyle = {
  backgroundColor: colors.surface,
  borderTopColor: colors.border,
  ...shadows.bar,
  ...Platform.select({ web: { height: 64, paddingTop: 6, paddingBottom: 8 }, default: {} }),
};

// Screens with their own sticky action bar hide the tab bar.
const FULL_SCREEN_ROUTES = new Set(['Checkout', 'AddressPicker', 'OrderSuccess', 'DeliveryMap']);

const tabBarFor = (route) =>
  FULL_SCREEN_ROUTES.has(getFocusedRouteNameFromRoute(route)) ? { display: 'none' } : tabBarStyle;

const tabIcon = (name) =>
  function TabIcon({ focused, color, size }) {
    return (
      <MaterialCommunityIcons name={focused ? name : `${name}-outline`} size={size} color={color} />
    );
  };

export const MainTabs = () => {
  const cartCount = useCartStore((state) => state.totalItemsInCart());
  const userId = useUserStore((state) => state.user?.userId);
  const loadFavorites = useFavoritesStore((state) => state.load);

  useEffect(() => {
    if (userId) {
      loadFavorites();
    }
  }, [userId, loadFavorites]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: tabBarFor(route),
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarLabelStyle: { fontFamily: fontFamilies.medium, fontSize: 11 },
        tabBarBadgeStyle: { backgroundColor: colors.primary, fontSize: 10 },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{ tabBarLabel: 'Home', tabBarIcon: tabIcon('home') }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesNavigator}
        options={{ tabBarLabel: 'Favorites', tabBarIcon: tabIcon('heart') }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: tabIcon('cart'),
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile', tabBarIcon: tabIcon('account-circle') }}
      />
    </Tab.Navigator>
  );
};
